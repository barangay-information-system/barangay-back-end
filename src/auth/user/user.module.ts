import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { BarangayEmployee } from 'src/barangay_employee/entities/barangay_employee.entity';
import { MailModule } from 'src/mail/mail.module';
import { Otp } from 'src/otp/entities/otp.entity';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([User, BarangayEmployee, Otp])],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService]
})
export class UserModule { }
