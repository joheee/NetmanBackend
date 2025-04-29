import { Module } from '@nestjs/common';
import { ChildProcessModule } from './api/child_process/child_process.module';
import { WolModule } from './api/wol/wol.module';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './api/room/room.module';
import { CommandModule } from './api/command/command.module';
import { ComputerModule } from './api/computer/computer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    WolModule,
    ChildProcessModule,
    RoomModule,
    CommandModule,
    ComputerModule,
  ],
})
export class AppModule {}
