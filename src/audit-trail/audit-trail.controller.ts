import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { AuditTrailService } from "./audit-trail.service";
import { CreateAuditTrailDto } from "./dto/create-audit-trail.dto";
import { UpdateAuditTrailDto } from "./dto/update-audit-trail.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller({ path: "audit-trail", version: "1" })
@ApiTags("Audit Trail")
export class AuditTrailController {
  constructor(private readonly auditTrailService: AuditTrailService) {}

  @Post()
  create(@Body() createAuditTrailDto: CreateAuditTrailDto) {
    return this.auditTrailService.create(createAuditTrailDto);
  }

  @Get("find-all")
  findAll(
    @Query()
    queries: {
      date_from: Date;
      date_to: Date;
    }
  ) {
    return this.auditTrailService.findAll(queries);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.auditTrailService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAuditTrailDto: UpdateAuditTrailDto
  ) {
    return this.auditTrailService.update(+id, updateAuditTrailDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.auditTrailService.remove(+id);
  }
}
