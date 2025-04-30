import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { RoomService } from '../room.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueRoomNameConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly roomService: RoomService) {}

  async validate(name: string) {
    const room = await this.roomService.findOneByName(name);
    return !room;
  }

  defaultMessage(args: ValidationArguments): string {
    return `The name ${args.value} is already taken.`;
  }
}
