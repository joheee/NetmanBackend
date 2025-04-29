import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RoomService } from '../room.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsRoomIdExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly roomService: RoomService) {}

  async validate(room_id: string) {
    const findItem = await this.roomService.findOne(room_id);
    return !!findItem;
  }

  defaultMessage?(args?: ValidationArguments): string {
    return `The room ID ${args.value} is not found`;
  }
}
