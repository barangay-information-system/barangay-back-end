import { Injectable } from "@nestjs/common";
import { CreateResidentDto } from "./dto/create-resident.dto";
import { UpdateResidentDto } from "./dto/update-resident.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Resident } from "./entities/resident.entity";
import { Purok } from "src/purok/entities/purok.entity";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class ResidentService {
  constructor(
    @InjectRepository(Resident)
    private readonly repo: Repository<Resident>,
    @InjectRepository(Purok)
    private readonly purokRepo: Repository<Purok>,
  ) {}

  async create(dto: CreateResidentDto) {
    dto.fullName = this.getFullName(dto);
    const model = this.repo.create(dto);
    const res = await this.repo.save(model);
    return this.findOne(res.id);
  }

  async findAll() {
    const result = await this.repo.find({ order: { created_at: "ASC" } });
    return result;
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id: id },
    });
  }

  update(id: number, dto: UpdateResidentDto) {
    return `This action updates a #${id} resident`;
  }

  remove(id: number) {
    return `This action removes a #${id} resident`;
  }

  getFullName(resident: CreateResidentDto): string {
    let fullName = "";


    if (resident.prefix) {
      fullName += resident.prefix + " ";
    }

    fullName += resident.lastname + ", " + resident.firstname;

    if (resident.middlename) {
      fullName += " " + resident.middlename.charAt(0) + ".";
    }

    if (resident.suffix) {
      fullName += " " + resident.suffix;
    }

    return fullName;
  }
}
