import { Injectable } from '@nestjs/common';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComputerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createComputerDto: CreateComputerDto) {
    return await this.prisma.computer.create({
      data: createComputerDto,
    });
  }

  async findAll() {
    return await this.prisma.computer.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.computer.findFirst({
      where: { id },
    });
  }

  async findOneByIp(ip: string) {
    return await this.prisma.computer.findFirst({
      where: { ip },
    });
  }

  async findOneByMac(mac: string) {
    return await this.prisma.computer.findFirst({
      where: { mac },
    });
  }

  async update(id: string, updateComputerDto: UpdateComputerDto) {
    return await this.prisma.computer.update({
      where: { id },
      data: updateComputerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.computer.delete({
      where: { id },
    });
  }
}
