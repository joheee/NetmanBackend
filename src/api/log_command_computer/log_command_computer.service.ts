import { Injectable } from '@nestjs/common';
import { CreateLogCommandComputerDto } from './dto/create-log_command_computer.dto';
import { UpdateLogCommandComputerDto } from './dto/update-log_command_computer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ComputerService } from '../computer/computer.service';
import { CommandService } from '../command/command.service';

@Injectable()
export class LogCommandComputerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly computerService: ComputerService,
    private readonly commandService: CommandService,
  ) {}

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

  async createByIps(
    ip: string,
    commandId: string,
    statusCode: string,
    executionTime: number,
  ) {
    const findComputerByIp = await this.computerService.findOneByIp(ip);
    return await this.prisma.logCommandComputer.create({
      data: {
        commandId,
        statusCode,
        executionTime,
        computerId: findComputerByIp.id,
      },
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
