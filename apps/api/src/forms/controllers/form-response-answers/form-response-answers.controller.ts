import { ENDPOINT_FORM_RESPONSE_ANSWERS_SLUG } from '@flow-recruitment/forms/constants';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { FormResponseAnswersService } from '../../services/form-response-answers/form-response-answers.service';
import { UpdateFormResponseAnswerValueDto, UpdateFormResponseAnswerValueParams } from '@flow-recruitment/forms/dtos';

@Controller(ENDPOINT_FORM_RESPONSE_ANSWERS_SLUG)
export class FormResponseAnswersController {
  constructor(private readonly answersService: FormResponseAnswersService) {}

  @Patch(':id')
  async updateValue(
    @Param() { id }: UpdateFormResponseAnswerValueParams,
    @Body() { newValue }: UpdateFormResponseAnswerValueDto,
  ) {
    return await this.answersService.updateValue({ id, newValue });
  }
}
