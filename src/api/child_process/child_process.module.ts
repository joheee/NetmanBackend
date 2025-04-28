import { Module } from '@nestjs/common';
import { ChildProcessGateway } from './child_process.gateway';
import { ConfigModule } from '@nestjs/config';
import serverConfig from 'src/config/server.config';

@Module({
  imports: [ConfigModule.forFeature(serverConfig)],
  providers: [ChildProcessGateway],
})
export class ChildProcessModule {}
