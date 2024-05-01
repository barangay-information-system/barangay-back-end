import { PartialType } from '@nestjs/swagger';
import { CreatePurokDto } from './create-purok.dto';

export class UpdatePurokDto extends PartialType(CreatePurokDto) {}
