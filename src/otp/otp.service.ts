import { Injectable } from "@nestjs/common";
import { CreateOtpDto } from "./dto/create-otp.dto";
import { UpdateOtpDto } from "./dto/update-otp.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Otp } from "./entities/otp.entity";

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly repo: Repository<Otp>
  ) {}
  create(createOtpDto: CreateOtpDto) {
    return "This action adds a new otp";
  }

  findAll() {
    return `This action returns all otp`;
  }

  findOne(code: string) {
    const res = this.repo.findOne({
      where: { code: code },
    });

    if (!res) return "No OTP found.";
    return res;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }
}
