import { CreateFormQuestionDto } from '@flow-recruitment/forms/dtos';
import {
  PrismaClientService,
  PrismaTransactionExtandable,
  callWithInjectedPrismaTransaction,
} from '@flow-recruitment/prisma';
import { Injectable } from '@nestjs/common';
import {
  AnchorsMap,
  CreateManyFormQuestionVisibilityRulesPayload,
  FormQuestionVisibilityRulesService,
} from '../form-question-visibility-rules/form-question-visibility-rules.service';

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
      const questionPromises = questions.map((question) => {
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

        return tx.formQuestion.create({
          data: {
            id: questionId,
            form: { connect: { id: formId } },
            inputType: question.inputType,
            title: question.title,
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
