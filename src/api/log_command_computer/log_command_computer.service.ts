import { Injectable } from '@nestjs/common';
import { CreateLogCommandComputerDto } from './dto/create-log_command_computer.dto';
import { UpdateLogCommandComputerDto } from './dto/update-log_command_computer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogCommandComputerService {
  constructor(private readonly prisma: PrismaService) {}

  private include() {
    return {
      include: {
        Command: true,
        Computer: true,
      },
    };
  }

  async create(createLogCommandComputerDto: CreateLogCommandComputerDto) {
    return await this.prisma.logCommandComputer.create({
      data: createLogCommandComputerDto,
      ...this.include(),
    });
  }

  async findAll() {
    return await this.prisma.logCommandComputer.findMany({
      ...this.include(),
    });
  }

  async findOne(id: string) {
    return await this.prisma.logCommandComputer.findFirst({
      where: { id },
      ...this.include(),
    });
  }

  async update(
    id: string,
    updateLogCommandComputerDto: UpdateLogCommandComputerDto,
  ) {
    return await this.prisma.logCommandComputer.update({
      where: { id },
      data: updateLogCommandComputerDto,
      ...this.include(),
    });
  }

  async remove(id: string) {
    return await this.prisma.logCommandComputer.delete({
      where: { id },
    });
  }
}
