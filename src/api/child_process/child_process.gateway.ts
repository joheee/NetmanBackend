import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { spawn } from 'child_process';
import { fromEvent, map, merge } from 'rxjs';
import { Socket } from 'socket.io';
import serverConfig from 'src/config/server.config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChildProcessGateway {
  constructor(
    @Inject(serverConfig.KEY)
    private serverConfiguration: ConfigType<typeof serverConfig>,
  ) {}

  @SubscribeMessage('testingConnection')
  handleTestingConnection(@ConnectedSocket() client: Socket) {
    client.emit('testingConnectionOutput', {
      message: 'connection success',
    });
  }

  @SubscribeMessage('executeCommand')
  handleExecuteCommand(
    @MessageBody() data: unknown,
    @ConnectedSocket() client: Socket,
  ) {
    const overallStartTime = Date.now();

    try {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        throw new Error('Data must be a valid JSON object.');
      }

      const { ips, command: customCommand } = data as {
        ips: string[];
        command: string;
      };

      if (
        !Array.isArray(ips) ||
        ips.length === 0 ||
        typeof customCommand !== 'string'
      ) {
        throw new Error(
          'Both "ips" (as array) and "command" (as string) are required.',
        );
      }

      const ipTimings = new Map<string, number>();

      ips.forEach((ip) => {
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
          customCommand,
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
          map((code) => {
            const executionTimeMs = Date.now() - ipTimings.get(ip);
            const executionTimeSec = (executionTimeMs / 1000).toFixed(2);
            return {
              ip,
              type: 'close',
              code,
              executionTime: `${executionTimeSec} s`,
            };
          }),
        );

        merge(stdout$, stderr$, close$).subscribe((payload) => {
          client.emit('executeCommandOutput', payload);
        });
      });

      client.emit('executeCommandStarted', {
        message: `Command execution started for ${ips.length} machines`,
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
}
