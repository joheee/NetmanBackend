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
import { ComputerService } from './computer.service';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsComputerIdExist } from './pipe/is-computer-id-exist.pipe';

const TABLE_NAME = 'computer';

@ApiTags('Computer Controller')
@Controller('computer')
export class ComputerController {
  constructor(private readonly computerService: ComputerService) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(@Body() createComputerDto: CreateComputerDto) {
    const createItem = await this.computerService.create(createComputerDto);
    return new HttpException(createItem, HttpStatus.OK);
  }

  @Get()
  @ApiOperation({ summary: `find ${TABLE_NAME}` })
  async findAll() {
    const findAllItem = await this.computerService.findAll();
    return new HttpException(findAllItem, HttpStatus.OK);
  }

  @Get(':id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    example: 'get this from computer table',
  })
  @UsePipes(IsComputerIdExist)
  async findOne(@Param('id') id: string) {
    const findItem = await this.computerService.findOne(id);
    return new HttpException(findItem, HttpStatus.OK);
  }

  @Patch(':id')
  @ApiOperation({ summary: `update ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    example: 'get this from computer table',
  })
  async update(
    @Param('id', IsComputerIdExist) id: string,
    @Body() updateComputerDto: UpdateComputerDto,
  ) {
    const updateItem = await this.computerService.update(id, updateComputerDto);
    return new HttpException(updateItem, HttpStatus.OK);
  }

  @Delete(':id')
  @ApiOperation({ summary: `remove ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    example: 'get this from computer table',
  })
  @UsePipes(IsComputerIdExist)
  async remove(@Param('id') id: string) {
    const removeItem = await this.computerService.remove(id);
    return new HttpException(removeItem, HttpStatus.OK);
  }
}
