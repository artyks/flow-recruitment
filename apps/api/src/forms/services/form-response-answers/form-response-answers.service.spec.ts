import { Test, TestingModule } from '@nestjs/testing';
import { FormResponseAnswersService } from './form-response-answers.service';

describe('FormAnswersService', () => {
  let service: FormResponseAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormResponseAnswersService],
    }).compile();

    service = module.get<FormResponseAnswersService>(FormResponseAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
