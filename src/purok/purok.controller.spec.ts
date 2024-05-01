import { Test, TestingModule } from '@nestjs/testing';
import { PurokController } from './purok.controller';
import { PurokService } from './purok.service';

describe('PurokController', () => {
  let controller: PurokController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurokController],
      providers: [PurokService],
    }).compile();

    controller = module.get<PurokController>(PurokController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
