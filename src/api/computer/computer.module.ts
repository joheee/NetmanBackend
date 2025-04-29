import { Module } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { ComputerController } from './computer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsComputerIdExist } from './pipe/is-computer-id-exist.pipe';
import { IsRoomIdExistConstraint } from '../room/constraint/is-room-id-exist.constraint';
import { RoomService } from '../room/room.service';

@Module({
  imports: [PrismaModule],
  controllers: [ComputerController],
  providers: [
    ComputerService,
    RoomService,
    IsRoomIdExistConstraint,
    IsComputerIdExist,
  ],
})
export class ComputerModule {}
