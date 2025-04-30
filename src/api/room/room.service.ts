import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  include() {
    return {
      include: {
        computers: true,
      },
    };
  }

  async create(createRoomDto: CreateRoomDto) {
    return await this.prisma.room.create({
      data: createRoomDto,
    });
  }

  async findAll() {
    return await this.prisma.room.findMany({
      ...this.include(),
    });
  }

  async findOne(id: string) {
    return await this.prisma.room.findFirst({
      where: { id },
      ...this.include(),
    });
  }

  async findOneByName(name: string) {
    return await this.prisma.room.findFirst({
      where: { name },
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return await this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.room.delete({
      where: { id },
    });
  }
}
