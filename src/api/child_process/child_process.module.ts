import { Module } from '@nestjs/common';
import { ChildProcessGateway } from './child_process.gateway';
import { ConfigModule } from '@nestjs/config';
import serverConfig from 'src/config/server.config';
import { ComputerService } from '../computer/computer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommandService } from '../command/command.service';
import { LogCommandComputerService } from '../log_command_computer/log_command_computer.service';

@Module({
  imports: [ConfigModule.forFeature(serverConfig), PrismaModule],
  providers: [
    ChildProcessGateway,
    ComputerService,
    CommandService,
    LogCommandComputerService,
  ],
})
export class ChildProcessModule {}
