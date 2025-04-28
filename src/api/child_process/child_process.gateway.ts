import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { spawn } from 'child_process';
import { fromEvent, map, merge } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChildProcessGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('executeCommand')
  handleExecuteCommand(@MessageBody() data: unknown) {
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

      ips.forEach((ip) => {
        const command = 'psexec';
        const args = [
          `\\\\${ip}`,
          '-u',
          'netman',
          '-p',
          'netman',
          '-i',
          '1',
          'cmd',
          '/c',
          customCommand,
        ];

        const child = spawn(command, args);

        const stderr$ = fromEvent<Buffer>(child.stderr, 'data').pipe(
          map((data) => ({
            ip,
            type: 'stderr',
            message: data.toString().trim(),
          })),
        );

        const close$ = fromEvent<number>(child, 'close').pipe(
          map((code) => ({
            ip,
            type: 'close',
            code,
          })),
        );

        merge(stderr$, close$).subscribe((payload) => {
          this.server.emit('childProcessOutput', payload);
        });
      });
    } catch (error) {
      this.server.emit('error', {
        message: (error as Error).message || 'Unknown error occurred.',
      });
    }
  }
}
