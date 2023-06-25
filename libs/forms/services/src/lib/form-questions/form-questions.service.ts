import { CreateFormQuestionDto } from '@flow-recruitment/forms/dtos';
import { PrismaClientService } from '@flow-recruitment/prisma/client';
import { Injectable } from '@nestjs/common';
import {
  AnchorsMap,
  CreateManyFormQuestionVisibilityRulesPayload,
  FormQuestionVisibilityRulesService,
} from '../form-question-visibility-rules/form-question-visibility-rules.service';
import { PrismaTransactionExtandable, callWithInjectedPrismaTransaction } from '@flow-recruitment/prisma/utilities';
import * as crypto from 'crypto';

type CreateManyFormQuestionsPayload = {
  formId: string;
  questions: CreateFormQuestionDto[];
};

@Injectable()
export class FormQuestionsService implements PrismaTransactionExtandable {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly questionVisibilityRulesService: FormQuestionVisibilityRulesService,
  ) {}

  /**
   * Allows other services inject prisma transaction client for handling transaction among services
   */
  getThis() {
    return this;
  }

  async createMany({ formId, questions }: CreateManyFormQuestionsPayload) {
    return await this.prisma.$transaction(async (tx) => {
      const visibilityRulePayloads: Omit<CreateManyFormQuestionVisibilityRulesPayload, 'anchorsMap'>[] = [];
      const anchorsMap: AnchorsMap = {};

      /**
       * Create questions
       */
      const questionPromises = questions.map(async (question) => {
        /**
         * Eagerly generate question id to use it later in anchors map
         */
        const questionId = crypto.randomUUID();

        /**
         * Collect visibility rules to create them later
         */
        const questionVisibilityRules = question.visibilityRules;
        if (questionVisibilityRules && questionVisibilityRules.length) {
          visibilityRulePayloads.push({ rules: questionVisibilityRules, questionId });
        }

        /**
         * Map anchors with their questionIds
         */
        if (question.anchor) {
          anchorsMap[question.anchor] = questionId;
        }

        return await tx.formQuestion.create({
          data: {
            id: questionId,
            form: { connect: { id: formId } },
            inputType: question.inputType,
            title: question.title,
            choiceOptions: question.choiceOptions,
          },
        });
      });
      await Promise.all(questionPromises);

      /**
       * Create questions' visibility rules
       */
      const visibilityRulesPromises = visibilityRulePayloads.map(async (rulePayload) => {
        return await callWithInjectedPrismaTransaction({
          tx,
          service: this.questionVisibilityRulesService,
          method: 'createMany',
          args: [{ ...rulePayload, anchorsMap }],
        });
      });
      await Promise.all(visibilityRulesPromises);
    });
  }
}
