import { ApiProperty } from '@nestjs/swagger';

export class CreateWolDto {
  @ApiProperty({ default: '10:E7:C6:0A:68:09' })
  mac: string;
}
