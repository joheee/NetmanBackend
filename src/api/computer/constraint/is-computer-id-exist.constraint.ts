import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ComputerService } from '../computer.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsComputerIdExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly computerService: ComputerService) {}

  async validate(computer_id: any) {
    const findItem = await this.computerService.findOne(computer_id);
    return !!findItem;
  }

  defaultMessage?(args?: ValidationArguments): string {
    return `the computer ID ${args.value} is not found`;
  }
}
