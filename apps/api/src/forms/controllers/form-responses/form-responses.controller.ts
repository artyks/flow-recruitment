import {
  ENDPOINT_FORM_RESPONSES_SLUG,
  FIND_MY_UNCOMPLETED_FORM_RESPONSES_SLUG,
  FIND_OR_CREATE_MY_FORM_RESPONSE_SLUG,
} from '@flow-recruitment/forms/constants';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { FormResponsesService } from '../../services/form-responses/form-responses.service';
import { FindOrCreateMyFormResponseByFormIdDto } from '@flow-recruitment/forms/dtos';
import { User } from '@flow-recruitment/common/decorators';
import { UserWithoutPassword } from '@flow-recruitment/users/types';
import {
  FindMyUncompletedFormResponsesResult,
  FindOrCreateMyFormResponseByFormIdResult,
} from '@flow-recruitment/forms/types';
import { FormsService } from '../../services/forms/forms.service';
import { FormResponse } from '@flow-recruitment/prisma';

@Controller(ENDPOINT_FORM_RESPONSES_SLUG)
export class FormResponsesController {
  constructor(
    private readonly formResponsesService: FormResponsesService,
    private readonly formsService: FormsService,
  ) {}

  @Get(FIND_MY_UNCOMPLETED_FORM_RESPONSES_SLUG)
  async findMyUncompletedActive(
    @User() { id: userId }: UserWithoutPassword,
  ): Promise<FindMyUncompletedFormResponsesResult> {
    const allUncompletedResponses = await this.formResponsesService.findMyUncompleted({ userId });
    if (allUncompletedResponses.length === 0) {
      return [];
    }
    const activeForms = await this.formsService.findAllActive();
    const isResponseActive = (someResponse: FormResponse) => {
      return Boolean(activeForms.find((someActiveForm) => someActiveForm.id === someResponse.formId));
    };
    const activeUncompletedResponses = allUncompletedResponses.filter((someResponse) => isResponseActive(someResponse));
    return activeUncompletedResponses;
  }

  @Post(FIND_OR_CREATE_MY_FORM_RESPONSE_SLUG)
  async findOrCreateMyByFormId(
    @User() { id: userId }: UserWithoutPassword,
    @Body() { formId }: FindOrCreateMyFormResponseByFormIdDto,
  ): Promise<FindOrCreateMyFormResponseByFormIdResult> {
    const responsePersisted = await this.formResponsesService.findMyByFormId({ formId, userId });
    if (responsePersisted) {
      return responsePersisted;
    }
    return await this.formResponsesService.createOne({ formId, userId });
  }
}
