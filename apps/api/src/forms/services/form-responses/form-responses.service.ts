import { CreateFormResponseDto, FindOrCreateMyFormResponseByFormIdDto } from '@flow-recruitment/forms/dtos';
import { PrismaClientService, callWithInjectedPrismaTransaction } from '@flow-recruitment/prisma';
import { Injectable } from '@nestjs/common';
import { FormResponseAnswersService } from '../form-response-answers/form-response-answers.service';
import { WithUserId } from '@flow-recruitment/common/types';

type CreateFormResponsePayload = CreateFormResponseDto & WithUserId;
type FindMyFormResponsePayload = FindOrCreateMyFormResponseByFormIdDto & WithUserId;
type FindMyUncompletedFormResponsesPayload = WithUserId;

@Injectable()
export class FormResponsesService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly responseAnswersService: FormResponseAnswersService,
  ) {}

  async findMyByFormId({ userId, formId }: FindMyFormResponsePayload) {
    return await this.prisma.formResponse.findFirst({ where: { userId, formId }, include: { answers: true } });
  }

  async findMyUncompleted({ userId }: FindMyUncompletedFormResponsesPayload) {
    return await this.prisma.formResponse.findMany({ where: { userId, isCompleted: false } });
  }

  async createOne({ answers, formId, userId }: CreateFormResponsePayload) {
    /**
     * Eagerly generate response id to use it later with answers
     */
    const formResponseId = crypto.randomUUID();

    return await this.prisma.$transaction(async (tx) => {
      /**
       * Create response
       */
      await tx.formResponse.create({
        data: {
          id: formResponseId,
          form: { connect: { id: formId } },
          user: { connect: { id: userId } },
        },
      });

      /**
       * Create response's answers
       */
      if (answers) {
        await callWithInjectedPrismaTransaction({
          tx,
          service: this.responseAnswersService,
          method: 'createMany',
          args: [{ formResponseId, answerDtos: answers }],
        });
      }

      /**
       * Retrieve and return created response filled with answers
       */
      return await tx.formResponse.findUniqueOrThrow({
        where: { id: formResponseId },
        include: { answers: true },
      });
    });
  }
}
