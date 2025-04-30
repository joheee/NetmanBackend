import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ComputerService } from '../computer.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueComputerMacConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly computerService: ComputerService) {}

  async validate(mac: any) {
    const findItem = await this.computerService.findOneByMac(mac);
    return !findItem;
  }

  defaultMessage?(args?: ValidationArguments): string {
    return `the computer Mac ${args.value} is already taken`;
  }
}
