import { Test, TestingModule } from '@nestjs/testing';
import { FormQuestionVisibilityRulesService } from './form-question-visibility-rules.service';

describe('FormQuestionVisibilityRulesService', () => {
  let service: FormQuestionVisibilityRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormQuestionVisibilityRulesService],
    }).compile();

    service = module.get<FormQuestionVisibilityRulesService>(FormQuestionVisibilityRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
