import { ApiProperty } from "@nestjs/swagger";

export class CreateWolDto {
    @ApiProperty({default:"20:DE:20:DE:20:DE"})
    mac:string
}
