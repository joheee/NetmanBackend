import { Module } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { ComputerController } from './computer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsComputerIdExist } from './pipe/is-computer-id-exist.pipe';
import { IsRoomIdExistConstraint } from '../room/constraint/is-room-id-exist.constraint';
import { RoomService } from '../room/room.service';
import { IsUniqueComputerIpConstraint } from './constraint/is-unique-computer-ip.constraint';
import { IsUniqueComputerMacConstraint } from './constraint/is-unique-computer-mac.constraint';

@Module({
  imports: [PrismaModule],
  controllers: [ComputerController],
  providers: [
    ComputerService,
    RoomService,
    IsRoomIdExistConstraint,
    IsUniqueComputerIpConstraint,
    IsUniqueComputerMacConstraint,
    IsComputerIdExist,
  ],
})
export class ComputerModule {}
