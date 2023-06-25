import { IsUUID } from 'class-validator';

class CreateFormResponseAnswerDto {
  @IsUUID()
  questionId: string;
}

class CreateFormResponseDto {
  @IsUUID()
  formId: string;
}

export { CreateFormResponseDto, CreateFormResponseAnswerDto };
