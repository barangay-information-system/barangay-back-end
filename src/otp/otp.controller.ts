import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { OtpService } from "./otp.service";
import { CreateOtpDto } from "./dto/create-otp.dto";
import { UpdateOtpDto } from "./dto/update-otp.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("OTP")
@Controller({ path: "otp", version: "1" })
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post()
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.create(createOtpDto);
  }

  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @Get(":code")
  findOne(@Param("code") code: string) {
    return this.otpService.findOne(code);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(+id, updateOtpDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.otpService.remove(+id);
  }
}
