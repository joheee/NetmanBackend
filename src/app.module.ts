import { Module } from '@nestjs/common';
import { ChildProcessModule } from './api/child_process/child_process.module';
import { WolModule } from './api/wol/wol.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    WolModule,
    ChildProcessModule,
  ],
})
export class AppModule {}
