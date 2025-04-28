import { Module } from '@nestjs/common';
import { ChildProcessGateway } from './child_process.gateway';

@Module({
  providers: [ChildProcessGateway],
})
export class ChildProcessModule {}
