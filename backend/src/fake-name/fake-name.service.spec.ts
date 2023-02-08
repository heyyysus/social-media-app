import { Test, TestingModule } from '@nestjs/testing';
import { FakeNameService } from './fake-name.service';

describe('FakeNameService', () => {
  let service: FakeNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeNameService],
    }).compile();

    service = module.get<FakeNameService>(FakeNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
