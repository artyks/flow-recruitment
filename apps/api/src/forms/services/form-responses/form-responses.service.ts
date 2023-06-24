import { CreateFormResponseDto, FindMyFormResponseParams } from '@flow-recruitment/forms/dtos';
import { PrismaClientService, callWithInjectedPrismaTransaction } from '@flow-recruitment/prisma';
import { Injectable } from '@nestjs/common';
import { FormResponseAnswersService } from '../form-response-answers/form-response-answers.service';
import { WithUserId } from '@flow-recruitment/common/types';

type CreateFormResponsePayload = CreateFormResponseDto & WithUserId;
type FindMyFormResponsePayload = FindMyFormResponseParams & WithUserId;
type FindMyUncompletedFormResponsesPayload = WithUserId;

@Injectable()
export class FormResponsesService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly responseAnswersService: FormResponseAnswersService,
  ) {}

  async findMyByFormId({ userId, formId }: FindMyFormResponsePayload) {
    return await this.prisma.formResponse.findFirstOrThrow({ where: { userId, formId }, include: { answers: true } });
  }

  async findMyUncompleted({ userId }: FindMyUncompletedFormResponsesPayload) {
    return await this.prisma.formResponse.findMany({ where: { userId, isCompleted: false } });
  }

  async createOne({ answers, formId, userId }: CreateFormResponsePayload) {
    /**
     * Eagerly generate formResponse id to use it later with answers
     */
    const formResponseId = crypto.randomUUID();

    return await this.prisma.$transaction(async (tx) => {
      /**
       * Create form
       */
      await tx.formResponse.create({
        data: {
          id: formResponseId,
          form: { connect: { id: formId } },
          user: { connect: { id: userId } },
        },
      });

      /**
       * Create form response's answers
       */
      if (answers) {
        await callWithInjectedPrismaTransaction({
          tx,
          service: this.responseAnswersService,
          method: 'createMany',
          args: [{ formResponseId, answerDtos: answers }],
        });
      }
    });
  }
}
