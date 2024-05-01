import { Module } from "@nestjs/common";
import { PurokService } from "./purok.service";
import { PurokController } from "./purok.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purok } from "./entities/purok.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Purok])],
  controllers: [PurokController],
  providers: [PurokService],
  exports: [PurokService],
})
export class PurokModule {}
