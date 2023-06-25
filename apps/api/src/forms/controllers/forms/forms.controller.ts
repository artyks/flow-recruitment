import { ENDPOINT_FORMS_SLUG } from '@flow-recruitment/forms/constants';
import { Controller, Get, Param } from '@nestjs/common';
import { FindFormParams } from '@flow-recruitment/forms/dtos';
import { FormsService } from '@flow-recruitment/forms/services';

@Controller(ENDPOINT_FORMS_SLUG)
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get(':id')
  async findFormById(@Param() { id }: FindFormParams) {
    return await this.formsService.findOneOrThrow(id);
  }
}
