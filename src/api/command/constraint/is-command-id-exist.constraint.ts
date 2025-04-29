import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CommandService } from '../command.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCommandIdExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly commandService: CommandService) {}
  async validate(command_id: any) {
    const findItem = await this.commandService.findOne(command_id);
    return !!findItem;
  }

  defaultMessage?(args?: ValidationArguments): string {
    return `the command ID ${args.value} is not found`;
  }
}
