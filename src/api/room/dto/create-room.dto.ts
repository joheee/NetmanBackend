import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, Validate } from 'class-validator';
import { IsUniqueNameConstraint } from '../constraint/is-unique-name.constraint';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUniqueNameConstraint)
  @ApiProperty({
    example: 'HDX',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(5, { message: 'Capacity must be at least 5' })
  @ApiProperty({
    example: 5,
    minimum: 5,
  })
  capacity: number;
}
