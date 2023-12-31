import { CreateFormDto } from '@flow-recruitment/forms/dtos';
import { PrismaClientService } from '@flow-recruitment/prisma/client';
import { Injectable } from '@nestjs/common';
import { FormQuestionsService } from '../form-questions/form-questions.service';
import { PrismaTransactionExtandable, callWithInjectedPrismaTransaction } from '@flow-recruitment/prisma/utilities';
import * as crypto from 'crypto';

@Injectable()
export class FormsService implements PrismaTransactionExtandable {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly formQuestionsService: FormQuestionsService,
  ) {}

  /**
   * Allows other services inject prisma transaction client for handling transaction among services
   */
  getThis() {
    return this;
  }

  async findOneOrThrow(id: string) {
    return await this.prisma.form.findUniqueOrThrow({
      where: { id },
      include: { questions: { include: { visibilityRules: true } } },
    });
  }

  async findAllActive() {
    return await this.prisma.form.findMany({
      where: { OR: [{ productCategoryPurchase: { isNot: null } }, { productCategorySearch: { isNot: null } }] },
    });
  }

  async createOne({ questions, type }: CreateFormDto) {
    /**
     * Eagerly generate form id to use it later with questions
     */
    const formId = crypto.randomUUID();

    return await this.prisma.$transaction(async (tx) => {
      /**
       * Create form
       */
      await tx.form.create({ data: { id: formId, type } });

      /**
       * Create form's questions
       */
      await callWithInjectedPrismaTransaction({
        tx,
        service: this.formQuestionsService,
        method: 'createMany',
        args: [{ formId, questions }],
      });

      return { id: formId };
    });
  }
}
