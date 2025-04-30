import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsRoomIdExistConstraint } from 'src/api/room/constraint/is-room-id-exist.constraint';
import { IsUniqueComputerIpConstraint } from '../constraint/is-unique-computer-ip.constraint';
import { IsUniqueComputerMacConstraint } from '../constraint/is-unique-computer-mac.constraint';

export class CreateComputerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'TESTING-PC-1',
  })
  hostname: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 2,
  })
  number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '10.10.10.10',
  })
  @Validate(IsUniqueComputerIpConstraint)
  ip: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'AB-AB-AB-AB-AB-AB',
  })
  @Validate(IsUniqueComputerMacConstraint)
  mac: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'get this from room table',
  })
  @Validate(IsRoomIdExistConstraint)
  roomId: string;
}
