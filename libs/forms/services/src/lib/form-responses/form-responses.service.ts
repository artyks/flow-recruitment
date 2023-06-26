import {
  CreateFormResponseAnswerDto,
  CreateFormResponseDto,
  FindOrCreateMyFormResponseByFormIdDto,
} from '@flow-recruitment/forms/dtos';
import { PrismaClientService } from '@flow-recruitment/prisma/client';
import { Injectable } from '@nestjs/common';
import { FormResponseAnswersService } from '../form-response-answers/form-response-answers.service';
import { WithUserId } from '@flow-recruitment/common/types';
import { callWithInjectedPrismaTransaction } from '@flow-recruitment/prisma/utilities';
import * as crypto from 'crypto';
import { FormQuestionsService } from '../form-questions';

type CreateFormResponsePayload = CreateFormResponseDto & WithUserId;
type FindMyFormResponsePayload = FindOrCreateMyFormResponseByFormIdDto & WithUserId;
type FindMyUncompletedFormResponsesPayload = WithUserId;

@Injectable()
export class FormResponsesService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly responseAnswersService: FormResponseAnswersService,
    private readonly formQuestionsService: FormQuestionsService,
  ) {}

  async findMyByFormId({ userId, formId }: FindMyFormResponsePayload) {
    return await this.prisma.formResponse.findFirst({ where: { userId, formId }, include: { answers: true } });
  }

  async findMyUncompleted({ userId }: FindMyUncompletedFormResponsesPayload) {
    return await this.prisma.formResponse.findMany({ where: { userId, isCompleted: false }, include: { form: true } });
  }

  async createOne({ formId, userId }: CreateFormResponsePayload) {
    /**
     * Eagerly generate response id to use it later with answers
     */
    const formResponseId = crypto.randomUUID();

    /**
     * Prepare answer skeleton dtos
     */
    const questions = await this.formQuestionsService.findManyByFormId(formId);
    const answerDtos: CreateFormResponseAnswerDto[] = questions.map((someQuestion) => {
      return {
        questionId: someQuestion.id,
      };
    });

    /**
     * Create response
     */
    await this.prisma.formResponse.create({
      data: {
        id: formResponseId,
        form: { connect: { id: formId } },
        user: { connect: { id: userId } },
      },
    });

    /**
     * Create response's answers
     */
    this.responseAnswersService.createMany({ formResponseId, answerDtos });

    /**
     * Retrieve and return created response filled with answers
     */
    return await this.prisma.formResponse.findUniqueOrThrow({
      where: { id: formResponseId },
      include: { answers: true },
    });
  }
}
