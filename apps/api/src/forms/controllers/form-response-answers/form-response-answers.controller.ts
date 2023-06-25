import { ENDPOINT_FORM_RESPONSE_ANSWERS_SLUG } from '@flow-recruitment/forms/constants';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateFormResponseAnswerValueDto, UpdateFormResponseAnswerValueParams } from '@flow-recruitment/forms/dtos';
import { FormResponseAnswersService } from '@flow-recruitment/forms/services';

@Controller(ENDPOINT_FORM_RESPONSE_ANSWERS_SLUG)
export class FormResponseAnswersController {
  constructor(private readonly answersService: FormResponseAnswersService) {}

  @Patch(':id')
  async updateValue(
    @Param() { id }: UpdateFormResponseAnswerValueParams,
    @Body() { newValue }: UpdateFormResponseAnswerValueDto,
  ) {
    // TODO: add user validation; so that user couldn't update other users' answers
    return await this.answersService.updateValue({ id, newValue });
  }
}
