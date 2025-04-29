import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UsePipes,
} from '@nestjs/common';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsCommandIdExist } from './pipe/is-command-id-exist.pipe';

const TABLE_NAME = 'command';

@ApiTags('Command Controller')
@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(@Body() createCommandDto: CreateCommandDto) {
    const createItem = await this.commandService.create(createCommandDto);
    return new HttpException(createItem, HttpStatus.OK);
  }

  @Get()
  @ApiOperation({ summary: `find all ${TABLE_NAME}` })
  async findAll() {
    const findAllCommand = await this.commandService.findAll();
    return new HttpException(findAllCommand, HttpStatus.OK);
  }

  @Get(':id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'get this from command table',
  })
  @UsePipes(IsCommandIdExist)
  async findOne(@Param('id') id: string) {
    const findOneItem = await this.commandService.findOne(id);
    return new HttpException(findOneItem, HttpStatus.OK);
  }

  @Patch(':id')
  @ApiOperation({ summary: `update ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'get this from command table',
  })
  @Patch(':id')
  async update(
    @Param('id', IsCommandIdExist) id: string,
    @Body() updateCommandDto: UpdateCommandDto,
  ) {
    const updateItem = await this.commandService.update(id, updateCommandDto);
    return new HttpException(updateItem, HttpStatus.OK);
  }

  @Delete(':id')
  @ApiOperation({ summary: `remove ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'get this from room table',
  })
  @UsePipes(IsCommandIdExist)
  async remove(@Param('id') id: string) {
    const removeItem = await this.commandService.remove(id);
    return new HttpException(removeItem, HttpStatus.OK);
  }
}
