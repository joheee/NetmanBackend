import { Injectable } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommandDto: CreateCommandDto) {
    return await this.prisma.command.create({
      data: createCommandDto,
    });
  }

  async findAll() {
    return await this.prisma.command.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.command.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateCommandDto: UpdateCommandDto) {
    return await this.prisma.command.update({
      where: { id },
      data: updateCommandDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.command.delete({
      where: { id },
    });
  }
}
