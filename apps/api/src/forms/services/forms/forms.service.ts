import { CreateFormDto } from '@flow-recruitment/forms/dtos';
import { PrismaClientService, callWithInjectedPrismaTransaction } from '@flow-recruitment/prisma';
import { Injectable } from '@nestjs/common';
import { FormQuestionsService } from '../form-questions/form-questions.service';

@Injectable()
export class FormsService {
  constructor(
    private readonly prisma: PrismaClientService,
    private readonly formQuestionsSerive: FormQuestionsService,
  ) {}

  async findOne(id: string) {
    return await this.prisma.form.findUnique({
      where: { id },
      include: { questions: { include: { visibilityRules: true } } },
    });
  }

  async createOne({ questions }: CreateFormDto) {
    /**
     * Eagerly generate form id to use it later with questions
     */
    const formId = crypto.randomUUID();

    return await this.prisma.$transaction(async (tx) => {
      /**
       * Create form
       */
      await tx.form.create({ data: { id: formId } });

      /**
       * Create form's questions
       */
      await callWithInjectedPrismaTransaction({
        tx,
        service: this.formQuestionsSerive,
        method: 'createMany',
        args: [{ formId, questions }],
      });
    });
  }
}
