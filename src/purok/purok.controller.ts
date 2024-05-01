import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PurokService } from "./purok.service";
import { CreatePurokDto } from "./dto/create-purok.dto";
import { UpdatePurokDto } from "./dto/update-purok.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Purok Setup")
@Controller({ path: "setup_purok", version: "1" })
export class PurokController {
  constructor(private readonly purokService: PurokService) {}

  @Post()
  create(@Body() createPurokDto: CreatePurokDto) {
    return this.purokService.create(createPurokDto);
  }

  @Get()
  findAll() {
    return this.purokService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.purokService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePurokDto: UpdatePurokDto) {
    return this.purokService.update(+id, updatePurokDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.purokService.remove(+id);
  }
}
