import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, Matches, ValidateIf } from 'class-validator';

export class CreateWolDto {
  @ApiProperty({
    default: [
      'A8-B1-3B-74-13-A6',
      'A8-B1-3B-74-12-16',
      'A8-B1-3B-74-82-CE',
      'A8-B1-3B-74-82-59',
      'A8-B1-3B-74-12-15',
    ],
    type: [String],
    description: 'Array of MAC addresses to wake up',
  })
  @IsArray()
  @IsNotEmpty({ message: 'MAC addresses array cannot be empty' })
  @ValidateIf((o) => o.mac !== undefined)
  @Matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
    each: true,
    message:
      'Invalid MAC address format. Use format like XX:XX:XX:XX:XX:XX or XX-XX-XX-XX-XX-XX',
  })
  mac: string[];
}
