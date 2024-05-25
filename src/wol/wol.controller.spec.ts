import { Test, TestingModule } from '@nestjs/testing';
import { WolController } from './wol.controller';
import { WolService } from './wol.service';

describe('WolController', () => {
  let controller: WolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WolController],
      providers: [WolService],
    }).compile();

    controller = module.get<WolController>(WolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
