import { Injectable } from '@nestjs/common';
import { CreatePurokDto } from './dto/create-purok.dto';
import { UpdatePurokDto } from './dto/update-purok.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purok } from './entities/purok.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurokService {
  constructor(
    @InjectRepository(Purok)
    private readonly repo: Repository<Purok>
  ) {}
  create(dto: CreatePurokDto) {
    return 'This action adds a new purok';
  }

  async findAll() {
    const result = await this.repo.find({ status: 'ACTIVE'});
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} purok`;
  }

  update(id: number, dto: UpdatePurokDto) {
    return `This action updates a #${id} purok`;
  }

  remove(id: number) {
    return `This action removes a #${id} purok`;
  }
}
