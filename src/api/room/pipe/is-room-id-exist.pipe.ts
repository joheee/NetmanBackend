import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { RoomService } from '../room.service';

@Injectable()
export class IsRoomIdExist implements PipeTransform {
  constructor(private readonly roomService: RoomService) {}

  async transform(id: any) {
    const findRoom = await this.roomService.findOne(id);
    if (!findRoom) {
      throw new BadRequestException(`Room with ID ${id} not found`);
    }
    return id;
  }
}
