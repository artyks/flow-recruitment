import {
  CreateFormResponseAnswerDto,
  UpdateFormResponseAnswerValueDto,
  UpdateFormResponseAnswerValueParams,
} from '@flow-recruitment/forms/dtos';
import { PrismaClientService, PrismaTransactionExtandable } from '@flow-recruitment/prisma';
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
    return await this.prisma.$transaction(async (tx) => {
      const promises = answerDtos.map(async (answerDto) => {
        return await tx.formResponseAnswer.create({
          data: {
            response: { connect: { id: formResponseId } },
            question: { connect: { id: answerDto.questionId } },
          },
        });
      });
      return await Promise.all(promises);
    });
  }

  async updateValue({ id, newValue }: UpdateFormResponseAnswerValuePayload) {
    return await this.prisma.formResponseAnswer.update({ where: { id }, data: { value: newValue || null } });
  }
}
