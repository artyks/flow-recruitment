import { Module } from '@nestjs/common';
import { FormsService } from './services/forms/forms.service';
import { FormResponsesService } from './services/form-responses/form-responses.service';
import { FormResponseAnswersService } from './services/form-response-answers/form-answers.service';
import { FormQuestionsService } from './services/form-questions/form-questions.service';
import { FormQuestionVisibilityRulesService } from './services/form-question-visibility-rules/form-question-visibility-rules.service';
import { FormsController } from './controllers/forms/forms.controller';

@Module({
  providers: [
    FormsService,
    FormResponsesService,
    FormResponseAnswersService,
    FormQuestionsService,
    FormQuestionVisibilityRulesService,
  ],
  controllers: [FormsController],
})
export class FormsModule {}
