import { ENDPOINT_FORMS_SLUG } from '@flow-recruitment/forms/constants';
import { Controller, Get, Param } from '@nestjs/common';
import { FindFormParams } from '@flow-recruitment/forms/dtos';
import { FormsService } from '@flow-recruitment/forms/services';
import { FindOneFormResult } from '@flow-recruitment/forms/types';

@Controller(ENDPOINT_FORMS_SLUG)
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get(':id')
  async findFormById(@Param() { id }: FindFormParams): Promise<FindOneFormResult> {
    return await this.formsService.findOneOrThrow(id);
  }
}
