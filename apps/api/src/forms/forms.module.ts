import { Module } from '@nestjs/common';
import { FormsService } from './services/forms/forms.service';
import { FormResponsesService } from './services/form-responses/form-responses.service';
import { FormResponseAnswersService } from './services/form-response-answers/form-response-answers.service';
import { FormQuestionsService } from './services/form-questions/form-questions.service';
import { FormQuestionVisibilityRulesService } from './services/form-question-visibility-rules/form-question-visibility-rules.service';
import { FormsController } from './controllers/forms/forms.controller';
import { FormResponsesController } from './controllers/form-responses/form-responses.controller';

@Module({
  providers: [
    FormsService,
    FormResponsesService,
    FormResponseAnswersService,
    FormQuestionsService,
    FormQuestionVisibilityRulesService,
  ],
  controllers: [FormsController, FormResponsesController],
})
export class FormsModule {}
