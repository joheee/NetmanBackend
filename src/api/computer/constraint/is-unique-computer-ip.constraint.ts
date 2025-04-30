import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ComputerService } from '../computer.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueComputerIpConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly computerService: ComputerService) {}

  async validate(ip: any) {
    const findItem = await this.computerService.findOneByIp(ip);
    return !findItem;
  }

  defaultMessage?(args?: ValidationArguments): string {
    return `the computer IP ${args.value} is already taken`;
  }
}
