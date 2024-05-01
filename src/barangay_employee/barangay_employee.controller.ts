import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BarangayEmployeeService } from "./barangay_employee.service";
import { CreateBarangayEmployeeDto } from "./dto/create-barangay_employee.dto";
import { UpdateBarangayEmployeeDto } from "./dto/update-barangay_employee.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Barangay Employee")
@Controller({ path: "barangay-employee", version: "1" })
export class BarangayEmployeeController {
  constructor(
    private readonly barangayEmployeeService: BarangayEmployeeService
  ) {}

  @Post()
  create(@Body() createBarangayEmployeeDto: CreateBarangayEmployeeDto) {
    return this.barangayEmployeeService.create(createBarangayEmployeeDto);
  }

  @Get()
  findAll() {
    return this.barangayEmployeeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.barangayEmployeeService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBarangayEmployeeDto: UpdateBarangayEmployeeDto
  ) {
    return this.barangayEmployeeService.update(+id, updateBarangayEmployeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.barangayEmployeeService.remove(+id);
  }
}
