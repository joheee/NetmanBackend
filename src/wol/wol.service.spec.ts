import { Test, TestingModule } from '@nestjs/testing';
import { WolService } from './wol.service';

describe('WolService', () => {
  let service: WolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WolService],
    }).compile();

    service = module.get<WolService>(WolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
