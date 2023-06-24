import { Test, TestingModule } from '@nestjs/testing';
import { FormResponseAnswersController } from './form-response-answers.controller';

describe('FormResponseAnswersController', () => {
  let controller: FormResponseAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormResponseAnswersController],
    }).compile();

    controller = module.get<FormResponseAnswersController>(FormResponseAnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
