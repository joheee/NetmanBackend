import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsCommandIdExistConstraint } from 'src/api/command/constraint/is-command-id-exist.constraint';
import { IsComputerIdExistConstraint } from 'src/api/computer/constraint/is-computer-id-exist.constraint';

export class CreateLogCommandComputerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '0',
  })
  statusCode: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  executionTime: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'get this from computer table',
  })
  @Validate(IsComputerIdExistConstraint)
  computerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'get this from command table',
  })
  @Validate(IsCommandIdExistConstraint)
  commandId: string;
}
