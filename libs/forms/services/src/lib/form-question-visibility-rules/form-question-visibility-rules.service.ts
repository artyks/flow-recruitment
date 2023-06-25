import { CreateFormQuestionVisibilityRule } from '@flow-recruitment/forms/dtos';
import { PrismaClientService } from '@flow-recruitment/prisma/client';
import { PrismaTransactionExtandable } from '@flow-recruitment/prisma/utilities';
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

  async createMany({ questionId, rules, anchorsMap }: CreateManyFormQuestionVisibilityRulesPayload) {
    return await this.prisma.$transaction(async (tx) => {
      const promises = rules.map(async (rule) => {
        if (rule.requiredValueArrayString === undefined && rule.requiredValueString === undefined) {
          throw new Error("Provide either 'requiredValueArrayString' or 'requiredValueString'");
        }
        return await tx.formQuestionVisibilityRule.create({
          data: {
            requiredValueString: rule.requiredValueString,
            requiredValueArrayString: rule.requiredValueArrayString,
            dependOnQuestion: { connect: { id: anchorsMap[rule.dependOnAnchor] } },
            question: { connect: { id: questionId } },
          },
        });
      });
      return await Promise.all(promises);
    });
  }
}

export type { AnchorsMap, CreateManyFormQuestionVisibilityRulesPayload };
