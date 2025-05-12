import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { spawn } from 'child_process';
import { fromEvent, map, merge, mergeMap } from 'rxjs';
import { Socket } from 'socket.io';
import serverConfig from 'src/config/server.config';
import { ExecuteCommandDto } from './dto/execute-command.dto';
import { ComputerService } from '../computer/computer.service';
import { CommandService } from '../command/command.service';
import { LogCommandComputerService } from '../log_command_computer/log_command_computer.service';
import { EventEmitter } from 'node:events';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChildProcessGateway {
  constructor(
    @Inject(serverConfig.KEY)
    private serverConfiguration: ConfigType<typeof serverConfig>,
    private computerService: ComputerService,
    private commandService: CommandService,
    private logCommandComputerService: LogCommandComputerService,
  ) {}

  @SubscribeMessage('testingConnection')
  handleTestingConnection(
    @MessageBody() stringData: string,
    @ConnectedSocket() client: Socket,
  ) {
    const overallStartTime = Date.now();

    try {
      const data = JSON.parse(stringData);

      if (!data || !Array.isArray(data.ips) || data.ips.length === 0) {
        throw new Error('IPs must be a non-empty array');
      }

      const ipTimings = new Map<string, number>();

      data.ips.forEach((ip) => {
        ipTimings.set(ip, Date.now());

        const dummyProcess = new EventEmitter();

        setTimeout(() => {
          dummyProcess.emit('data', Buffer.from('Connection test successful'));
        }, 1000);

        setTimeout(() => {
          dummyProcess.emit('close', [0]);
        }, 500);

        const stdout$ = fromEvent<Buffer>(dummyProcess, 'data').pipe(
          map((data) => {
            const executionTimeMs = Date.now() - ipTimings.get(ip);
            const executionTimeSec = (executionTimeMs / 1000).toFixed(2);
            return {
              ip,
              type: 'stdout',
              message: data.toString().trim(),
              executionTime: `${executionTimeSec} s`,
            };
          }),
        );

        const stderr$ = fromEvent<Buffer>(dummyProcess, 'stderr').pipe(
          map((data) => {
            const executionTimeMs = Date.now() - ipTimings.get(ip);
            const executionTimeSec = (executionTimeMs / 1000).toFixed(2);
            return {
              ip,
              type: 'stderr',
              message: data.toString().trim(),
              executionTime: `${executionTimeSec} s`,
            };
          }),
        );

        const close$ = fromEvent<number>(dummyProcess, 'close').pipe(
          map((code) => {
            const executionTimeMs = Date.now() - ipTimings.get(ip);
            const executionTimeSec = (executionTimeMs / 1000).toFixed(2);

            return {
              ip,
              type: 'close',
              statusCode: code[0],
              executionTime: `${executionTimeSec} s`,
            };
          }),
        );

        merge(stdout$, stderr$, close$).subscribe((payload) => {
          client.emit('testingConnectionOutput', payload);
        });
      });

      client.emit('testingConnectionStarted', {
        message: `Connection test started for ${data.ips.length} IPs`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      const errorTimeMs = Date.now() - overallStartTime;
      const errorTimeSec = (errorTimeMs / 1000).toFixed(2);

      client.emit('error', {
        message: (error as Error).message || 'Unknown error occurred.',
        executionTime: `${errorTimeSec}s`,
      });
    }
  }

  @SubscribeMessage('executeCommand')
  async handleExecuteCommand(
    @MessageBody() stringData: string,
    @ConnectedSocket() client: Socket,
  ) {
    const overallStartTime = Date.now();

    try {
      // Parse data if it's a string
      const data = JSON.parse(stringData) as ExecuteCommandDto;

      // Manual validation
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format - must be a JSON object');
      }

      // IP's must be a non empty array
      if (!Array.isArray(data.ips) || data.ips.length === 0) {
        throw new Error('IPs must be a non-empty array');
      }

      // Required commandId
      if (!data.commandId) {
        throw new Error('CommandId is required');
      }

      // CommandId must be string
      if (typeof data.commandId !== 'string') {
        throw new Error(`CommandId must be a string`);
      }

      // Validate if there is any IP's that is not found in the computer table
      const notFoundIps = await this.computerService.getNotFoundIps(data.ips);
      if (notFoundIps.length > 0) {
        throw new Error(
          `The following IPs were not found: ${notFoundIps.join(', ')}`,
        );
      }

      const findCommandById = await this.commandService.findOne(data.commandId);
      if (!findCommandById) {
        throw new Error(`Command ID ${data.commandId.toString()} is not found`);
      }

      const ipTimings = new Map<string, number>();

      data.ips.forEach((ip) => {
        ipTimings.set(ip, Date.now());

        const command = 'psexec';
        const args = [
          `\\\\${ip}`,
          '-u',
          this.serverConfiguration.windowsUsername,
          '-p',
          this.serverConfiguration.windowsPassword,
          '-i',
          '1',
          'cmd',
          '/c',
          findCommandById.value,
        ];

        const child = spawn(command, args);

        const stdout$ = fromEvent<Buffer>(child.stdout, 'data').pipe(
          map((data) => {
            const executionTimeMs = Date.now() - ipTimings.get(ip);
            const executionTimeSec = (executionTimeMs / 1000).toFixed(2);
            return {
              ip,
              type: 'stdout',
              message: data.toString().trim(),
              executionTime: `${executionTimeSec} s`,
            };
          }),
        );

        const stderr$ = fromEvent<Buffer>(child.stderr, 'data').pipe(
          map((data) => {
            const executionTimeMs = Date.now() - ipTimings.get(ip);
            const executionTimeSec = (executionTimeMs / 1000).toFixed(2);
            return {
              ip,
              type: 'stderr',
              message: data.toString().trim(),
              executionTime: `${executionTimeSec} s`,
            };
          }),
        );

        const close$ = fromEvent<number>(child, 'close').pipe(
          mergeMap(async (code) => {
            const executionTimeMs = Date.now() - ipTimings.get(ip);
            const executionTimeSec = (executionTimeMs / 1000).toFixed(2);

            const createLogCommandComputer =
              await this.logCommandComputerService.createByIps(
                ip,
                data.commandId,
                `${code[0]}`,
                parseFloat(executionTimeSec),
              );

            return {
              ip,
              type: 'close',
              statusCode: code[0],
              executionTime: `${executionTimeSec} s`,
              logCommandComputer: createLogCommandComputer,
            };
          }),
        );

        merge(stdout$, stderr$, close$).subscribe((payload) => {
          client.emit('executeCommandOutput', payload);
        });
      });

      client.emit('executeCommandStarted', {
        message: `Command execution started for ${data.ips.length} machines`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      const errorTimeMs = Date.now() - overallStartTime;
      const errorTimeSec = (errorTimeMs / 1000).toFixed(2);

      client.emit('error', {
        message: (error as Error).message || 'Unknown error occurred',
        executionTime: `${errorTimeSec}s`,
      });
    }
  }
}
