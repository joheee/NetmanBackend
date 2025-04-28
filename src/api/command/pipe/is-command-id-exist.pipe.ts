import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CommandService } from '../command.service';

@Injectable()
export class IsCommandIdExist implements PipeTransform {
  constructor(private readonly commandService: CommandService) {}

  async transform(id: any) {
    const findCommand = await this.commandService.findOne(id);
    if (!findCommand) {
      throw new BadRequestException(`Command with ID ${id} not found`);
    }
    return id;
  }
}
