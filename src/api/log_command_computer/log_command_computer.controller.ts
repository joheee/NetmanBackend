import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { LogCommandComputerService } from './log_command_computer.service';
import { CreateLogCommandComputerDto } from './dto/create-log_command_computer.dto';
import { UpdateLogCommandComputerDto } from './dto/update-log_command_computer.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsLogCommandComputerIdExistPipe } from './pipe/is-log-command-computer-id-exist.pipe';

const TABLE_NAME = 'log command computer';

@ApiTags('Log Command Computer Controller')
@Controller('log-command-computer')
export class LogCommandComputerController {
  constructor(
    private readonly logCommandComputerService: LogCommandComputerService,
  ) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(
    @Body() createLogCommandComputerDto: CreateLogCommandComputerDto,
  ) {
    const createItem = await this.logCommandComputerService.create(
      createLogCommandComputerDto,
    );
    return new HttpException(createItem, HttpStatus.OK);
  }

  @Get()
  @ApiOperation({ summary: `find all ${TABLE_NAME}` })
  async findAll() {
    const findAllItem = await this.logCommandComputerService.findAll();
    return new HttpException(findAllItem, HttpStatus.OK);
  }

  @Get(':id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    example: 'get this from log command computer table',
  })
  @UsePipes(IsLogCommandComputerIdExistPipe)
  async findOne(@Param('id') id: string) {
    const findItem = await this.logCommandComputerService.findOne(id);
    return new HttpException(findItem, HttpStatus.OK);
  }

  @Patch(':id')
  @ApiOperation({ summary: `update ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    example: 'get this from log command computer table',
  })
  async update(
    @Param('id', IsLogCommandComputerIdExistPipe) id: string,
    @Body() updateLogCommandComputerDto: UpdateLogCommandComputerDto,
  ) {
    return this.logCommandComputerService.update(
      id,
      updateLogCommandComputerDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: `remove ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    example: 'get this from log command computer table',
  })
  @UsePipes(IsLogCommandComputerIdExistPipe)
  async remove(@Param('id') id: string) {
    const removeItem = await this.logCommandComputerService.remove(id);
    return new HttpException(removeItem, HttpStatus.OK);
  }
}
