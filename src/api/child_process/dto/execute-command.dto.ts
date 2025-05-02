import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ExecuteCommandDto {
  @IsArray()
  @IsNotEmpty()
  ips: string[];

  @IsString()
  @IsNotEmpty()
  commandId: string;
}
