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

@Controller(ENDPOINT_FORM_RESPONSES_SLUG)
export class FormResponsesController {
  constructor(private readonly formResponsesService: FormResponsesService) {}

  @Get(FIND_MY_UNCOMPLETED_FORM_RESPONSES_SLUG)
  async findMyUncompleted(@User() { id: userId }: UserWithoutPassword): Promise<FindMyUncompletedFormResponsesResult> {
    return await this.formResponsesService.findMyUncompleted({ userId });
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
