import {
  CreateFormResponseAnswerDto,
  UpdateFormResponseAnswerValueDto,
  UpdateFormResponseAnswerValueParams,
} from '@flow-recruitment/forms/dtos';
import { PrismaClientService } from '@flow-recruitment/prisma/client';
import { PrismaTransactionExtandable } from '@flow-recruitment/prisma/utilities';
import { Injectable } from '@nestjs/common';

export type CreateFormResponseAnswerPayload = { formResponseId: string; answerDtos: CreateFormResponseAnswerDto[] };
type UpdateFormResponseAnswerValuePayload = UpdateFormResponseAnswerValueDto & UpdateFormResponseAnswerValueParams;

@Injectable()
export class FormResponseAnswersService implements PrismaTransactionExtandable {
  constructor(private readonly prisma: PrismaClientService) {}

  /**
   * Allows other services inject prisma transaction client for handling transaction among services
   */
  getThis() {
    return this;
  }

  async createMany({ answerDtos, formResponseId }: CreateFormResponseAnswerPayload) {
    const promises = answerDtos.map(async (answerDto) => {
      return await this.prisma.formResponseAnswer.create({
        data: {
          response: { connect: { id: formResponseId } },
          question: { connect: { id: answerDto.questionId } },
        },
      });
    });
    return await Promise.all(promises);
    // return await this.prisma.$transaction(async (txx) => {
    //   const promises = answerDtos.map(async (answerDto) => {
    //     return await txx.formResponseAnswer.create({
    //       data: {
    //         response: { connect: { id: formResponseId } },
    //         question: { connect: { id: answerDto.questionId } },
    //       },
    //     });
    //   });
    //   return await Promise.all(promises);
    // });
  }

  async updateValue({ id, newValueArrayString, newValueString }: UpdateFormResponseAnswerValuePayload) {
    return await this.prisma.formResponseAnswer.update({
      where: { id },
      data: { valueString: newValueString, valueArrayString: newValueArrayString },
    });
  }
}
