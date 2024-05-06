import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { ResidentController } from './resident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resident } from './entities/resident.entity';
import { Purok } from 'src/purok/entities/purok.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([Resident, Purok])],
  controllers: [ResidentController],
  providers: [ResidentService],
  exports: [ResidentService]
})
export class ResidentModule {}
