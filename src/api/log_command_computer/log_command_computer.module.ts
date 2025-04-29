import { Module } from '@nestjs/common';
import { LogCommandComputerService } from './log_command_computer.service';
import { LogCommandComputerController } from './log_command_computer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommandService } from '../command/command.service';
import { ComputerService } from '../computer/computer.service';
import { IsCommandIdExistConstraint } from '../command/constraint/is-command-id-exist.constraint';
import { IsComputerIdExistConstraint } from '../computer/constraint/is-computer-id-exist.constraint';

@Module({
  imports: [PrismaModule],
  controllers: [LogCommandComputerController],
  providers: [
    LogCommandComputerService,
    CommandService,
    ComputerService,
    IsCommandIdExistConstraint,
    IsComputerIdExistConstraint,
  ],
})
export class LogCommandComputerModule {}
