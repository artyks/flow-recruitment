import { IsUUID } from 'class-validator';

class FindOrCreateMyFormResponseByFormIdDto {
  @IsUUID()
  formId: string;
}

export { FindOrCreateMyFormResponseByFormIdDto };
