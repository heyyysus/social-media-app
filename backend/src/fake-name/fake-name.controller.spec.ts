import { Test, TestingModule } from '@nestjs/testing';
import { FakeNameController } from './fake-name.controller';

describe('FakeNameController', () => {
  let controller: FakeNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakeNameController],
    }).compile();

    controller = module.get<FakeNameController>(FakeNameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
