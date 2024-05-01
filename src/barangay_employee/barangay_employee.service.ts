import { Injectable } from "@nestjs/common";
import { CreateBarangayEmployeeDto } from "./dto/create-barangay_employee.dto";
import { UpdateBarangayEmployeeDto } from "./dto/update-barangay_employee.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BarangayEmployee } from "./entities/barangay_employee.entity";

@Injectable()
export class BarangayEmployeeService {
  constructor(
    @InjectRepository(BarangayEmployee)
    private readonly brgyRepo: Repository<BarangayEmployee>
  ) {}
  create(dto: CreateBarangayEmployeeDto) {
    return "This action adds a new barangayEmployee";
  }

  async findAll() {
    const result = await this.brgyRepo.find({ order: { lastname: "ASC" } });
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} barangayEmployee`;
  }

  update(id: number, dto: UpdateBarangayEmployeeDto) {
    return `This action updates a #${id} barangayEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} barangayEmployee`;
  }
}
