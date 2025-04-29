import { Injectable } from '@nestjs/common';
import { CreateLogCommandComputerDto } from './dto/create-log_command_computer.dto';
import { UpdateLogCommandComputerDto } from './dto/update-log_command_computer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogCommandComputerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLogCommandComputerDto: CreateLogCommandComputerDto) {
    return await this.prisma.logCommandComputer.create({
      data: createLogCommandComputerDto,
    });
  }

  async findAll() {
    return await this.prisma.logCommandComputer.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.logCommandComputer.findFirst({
      where: { id },
    });
  }

  async update(
    id: string,
    updateLogCommandComputerDto: UpdateLogCommandComputerDto,
  ) {
    return await this.prisma.logCommandComputer.update({
      where: { id },
      data: updateLogCommandComputerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.logCommandComputer.delete({
      where: { id },
    });
  }
}
