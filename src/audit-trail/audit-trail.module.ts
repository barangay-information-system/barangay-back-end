import { Module } from '@nestjs/common';
import { AuditTrailService } from './audit-trail.service';
import { AuditTrailController } from './audit-trail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditTrail } from './entities/audit-trail.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([AuditTrail])],
  controllers: [AuditTrailController],
  providers: [AuditTrailService]
})
export class AuditTrailModule {}
