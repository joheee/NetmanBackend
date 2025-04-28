import { Module } from '@nestjs/common';
import { ChildProcessModule } from './api/child_process/child_process.module';
import { WolModule } from './api/wol/wol.module';

@Module({
  imports: [WolModule, ChildProcessModule],
})
export class AppModule {}
