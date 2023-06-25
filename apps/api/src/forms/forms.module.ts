import { Module } from '@nestjs/common';
import { FormsController } from './controllers/forms/forms.controller';
import { FormResponsesController } from './controllers/form-responses/form-responses.controller';
import { FormResponseAnswersController } from './controllers/form-response-answers/form-response-answers.controller';
import {
  FormQuestionVisibilityRulesService,
  FormQuestionsService,
  FormResponseAnswersService,
  FormResponsesService,
  FormsService,
} from '@flow-recruitment/forms/services';

@Module({
  providers: [
    FormsService,
    FormResponsesService,
    FormResponseAnswersService,
    FormQuestionsService,
    FormQuestionVisibilityRulesService,
  ],
  controllers: [FormsController, FormResponsesController, FormResponseAnswersController],
})
export class FormsModule {}
