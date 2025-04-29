import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { LogCommandComputerService } from '../log_command_computer.service';

@Injectable()
export class IsLogCommandComputerIdExistPipe implements PipeTransform {
  constructor(
    private readonly logCommandComputerService: LogCommandComputerService,
  ) {}

  async transform(id: string) {
    const findItem = await this.logCommandComputerService.findOne(id);
    if (!findItem) {
      throw new BadRequestException(
        `log command computer with ID ${id} not found`,
      );
    }
    return id;
  }
}
