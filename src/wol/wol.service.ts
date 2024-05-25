import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWolDto } from './dto/create-wol.dto';

@Injectable()
export class WolService {
  async create(createWolDto: CreateWolDto) {
    const wol = require('wake_on_lan');
    try {
      await wol.wake(createWolDto.mac)
      return `success wake up pc with mac ${createWolDto.mac}`;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async findAll() {
    return `This action returns all wol`;
  }
}
