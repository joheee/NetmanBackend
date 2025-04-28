import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { RoomService } from '../room.service';

@Injectable()
export class IsRoomIdExist implements PipeTransform {
  constructor(private readonly roomService: RoomService) {}

  async transform(id: any) {
    console.log('jojo', id);
    const room = await this.roomService.findOne(id);
    if (!room) {
      throw new BadRequestException(`Room with ID ${id} not found`);
    }
    return id;
  }
}
