import { ApiProperty } from '@nestjs/swagger';
import { CommandType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Controll Command Start Explorer',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Start Explorer',
  })
  value: string;

  @IsEnum(CommandType)
  @IsNotEmpty()
  @ApiProperty({
    enum: CommandType,
    description: 'either CONTROL or SOFTWARE',
    example: 'CONTROL',
  })
  type: CommandType;
}
