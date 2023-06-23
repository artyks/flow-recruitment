import { IsUUID } from 'class-validator';

class FindMyFormResponseParams {
  @IsUUID()
  formId: string;
}

export { FindMyFormResponseParams };
