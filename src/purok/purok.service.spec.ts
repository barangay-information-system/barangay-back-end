import { Test, TestingModule } from '@nestjs/testing';
import { PurokService } from './purok.service';

describe('PurokService', () => {
  let service: PurokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurokService],
    }).compile();

    service = module.get<PurokService>(PurokService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
