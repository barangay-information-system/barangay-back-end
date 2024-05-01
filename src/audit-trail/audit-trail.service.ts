import { Injectable } from "@nestjs/common";
import { CreateAuditTrailDto } from "./dto/create-audit-trail.dto";
import { UpdateAuditTrailDto } from "./dto/update-audit-trail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { AuditTrail } from "./entities/audit-trail.entity";

@Injectable()
export class AuditTrailService {
  constructor(
    @InjectRepository(AuditTrail) private repo: Repository<AuditTrail>
  ) {}

  async create(createAuditTrailDto: CreateAuditTrailDto) {
    console.log(createAuditTrailDto);
    const model = this.repo.create(createAuditTrailDto);
    const activity = await this.repo.save(model);
    return this.findOne(activity.id);
  }

  async findAll(filter: { date_from: Date; date_to: Date }) {
    const data = await this.repo.find({
      where: {
        created_at: Between(
          new Date(filter.date_from),
          new Date(filter.date_to)
        ),
      },
      order: {
        created_at: "DESC",
      },
    });
    return data;
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id: id },
    });
  }

  update(id: number, updateAuditTrailDto: UpdateAuditTrailDto) {
    return `This action updates a #${id} auditTrail`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditTrail`;
  }
}
