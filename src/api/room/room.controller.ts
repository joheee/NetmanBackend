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
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsRoomIdExist } from './pipe/is-room-id-exist.pipe';

const TABLE_NAME = 'room';

@ApiTags('Room Controller')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: `create ${TABLE_NAME}` })
  async create(@Body() createRoomDto: CreateRoomDto) {
    const createRoom = await this.roomService.create(createRoomDto);
    return new HttpException(createRoom, HttpStatus.OK);
  }

  @Get()
  @ApiOperation({ summary: `find all ${TABLE_NAME}` })
  async findAll() {
    const findAllRoom = await this.roomService.findAll();
    return new HttpException(findAllRoom, HttpStatus.OK);
  }

  @Get(':id')
  @ApiOperation({ summary: `find ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'get this from room table',
  })
  @UsePipes(IsRoomIdExist)
  async findOne(@Param('id') id: string) {
    const findOneRoom = await this.roomService.findOne(id);
    return new HttpException(findOneRoom, HttpStatus.OK);
  }

  @Patch(':id')
  @ApiOperation({ summary: `update ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'get this from room table',
  })
  async update(
    @Param('id', IsRoomIdExist) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    const updateRoom = await this.roomService.update(id, updateRoomDto);
    return new HttpException(updateRoom, HttpStatus.OK);
  }

  @Delete(':id')
  @ApiOperation({ summary: `remove ${TABLE_NAME} by id` })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'get this from room table',
  })
  @UsePipes(IsRoomIdExist)
  async remove(@Param('id') id: string) {
    const removeRoom = await this.roomService.remove(id);
    return new HttpException(removeRoom, HttpStatus.OK);
  }
}
