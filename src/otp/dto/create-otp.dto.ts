import { ApiProperty } from "@nestjs/swagger";

export class CreateOtpDto {
    @ApiProperty()
    mobile_email: string;

    @ApiProperty()
    code: string;
}
