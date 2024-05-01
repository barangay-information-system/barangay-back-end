import { PartialType } from '@nestjs/swagger';
import { CreateBarangayEmployeeDto } from './create-barangay_employee.dto';

export class UpdateBarangayEmployeeDto extends PartialType(CreateBarangayEmployeeDto) {}
