import { Module } from '@nestjs/common';
import { FormsService } from './services/forms/forms.service';
import { FormResponsesService } from './services/form-responses/form-responses.service';
import { FormAnswersService } from './services/form-answers/form-answers.service';
import { FormQuestionsService } from './services/form-questions/form-questions.service';
import { FormQuestionVisibilityRulesService } from './services/form-question-visibility-rules/form-question-visibility-rules.service';

@Module({
  providers: [
    FormsService,
    FormResponsesService,
    FormAnswersService,
    FormQuestionsService,
    FormQuestionVisibilityRulesService,
  ],
})
export class FormsModule {}
