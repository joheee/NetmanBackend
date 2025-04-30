import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsRoomIdExist } from './pipe/is-room-id-exist.pipe';
import { IsUniqueRoomNameConstraint } from './constraint/is-unique-room-name.constraint';

@Module({
  imports: [PrismaModule],
  controllers: [RoomController],
  providers: [RoomService, IsUniqueRoomNameConstraint, IsRoomIdExist],
})
export class RoomModule {}
