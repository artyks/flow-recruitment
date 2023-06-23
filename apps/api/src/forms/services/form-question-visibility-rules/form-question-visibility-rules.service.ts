import { CreateFormQuestionVisibilityRule } from '@flow-recruitment/forms/dtos';
import { PrismaClientService, PrismaTransactionExtandable } from '@flow-recruitment/prisma';
import { Injectable } from '@nestjs/common';

type Anchor = string;
type QuestionId = string;
type AnchorsMap = { [key: Anchor]: QuestionId };

type CreateManyFormQuestionVisibilityRulesPayload = {
  questionId: string;
  rules: CreateFormQuestionVisibilityRule[];
  anchorsMap: AnchorsMap;
};

@Injectable()
export class FormQuestionVisibilityRulesService implements PrismaTransactionExtandable {
  constructor(private readonly prisma: PrismaClientService) {}

  /**
   * Allows other services inject prisma transaction client for handling transaction among services
   */
  getThis() {
    return this;
  }

  async createMany({ questionId, rules }: CreateManyFormQuestionVisibilityRulesPayload) {
    return await this.prisma.$transaction(async (tx) => {
      const promises = rules.map(async (rule) => {
        return await tx.formQuestionVisibilityRule.create({
          data: {
            requiredValue: rule.requiredValue,
            dependOnQuestion: { connect: { id: rule.dependOnAnchor } },
            question: { connect: { id: questionId } },
          },
        });
      });
      return await Promise.all(promises);
    });
  }
}

export type { AnchorsMap, CreateManyFormQuestionVisibilityRulesPayload };
