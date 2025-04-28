import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IsUniqueNameConstraint } from './constraint/is-unique-name.constraint';
import { IsRoomIdExist } from './pipe/is-room-id-exist.pipe';

@Module({
  imports: [PrismaModule],
  controllers: [RoomController],
  providers: [RoomService, IsUniqueNameConstraint, IsRoomIdExist],
})
export class RoomModule {}
