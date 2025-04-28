import { Controller, Post, Body } from '@nestjs/common';
import { WolService } from './wol.service';
import { CreateWolDto } from './dto/create-wol.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wol-controller')
@Controller('wol')
export class WolController {
  constructor(private readonly wolService: WolService) {}

  @Post()
  async create(@Body() createWolDto: CreateWolDto) {
    return await this.wolService.create(createWolDto);
  }
}
