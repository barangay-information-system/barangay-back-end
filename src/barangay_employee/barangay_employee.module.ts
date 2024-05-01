import { Module } from '@nestjs/common';
import { BarangayEmployeeService } from './barangay_employee.service';
import { BarangayEmployeeController } from './barangay_employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangayEmployee } from './entities/barangay_employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarangayEmployee])],
  controllers: [BarangayEmployeeController],
  providers: [BarangayEmployeeService],
  exports: [BarangayEmployeeService]
})
export class BarangayEmployeeModule {}
