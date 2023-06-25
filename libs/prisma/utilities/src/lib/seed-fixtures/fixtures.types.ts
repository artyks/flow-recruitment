import { FormType } from '@flow-recruitment/forms/constants';
import { CreateFormQuestionDto } from '@flow-recruitment/forms/dtos';

type FormConfig = {
  type: FormType;
  questions: CreateFormQuestionDto[];
};

export type { FormConfig };
