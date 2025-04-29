import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ComputerService } from '../computer.service';

@Injectable()
export class IsComputerIdExist implements PipeTransform {
  constructor(private readonly computerService: ComputerService) {}

  async transform(id: any) {
    const findItem = await this.computerService.findOne(id);
    if (!findItem) {
      throw new BadRequestException(`computer with ID ${id} not found`);
    }
    return id;
  }
}
