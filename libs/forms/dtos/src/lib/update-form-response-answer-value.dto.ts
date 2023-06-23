import { IsOptional, IsString, IsUUID } from 'class-validator';

class UpdateFormResponseAnswerValueQuery {
  @IsUUID()
  questionId: string;

  @IsUUID()
  formResponseId: string;
}

class UpdateFormResponseAnswerValueDto {
  @IsOptional()
  @IsString()
  newValue?: string | null; /** JSON string or null */
}

export { UpdateFormResponseAnswerValueDto, UpdateFormResponseAnswerValueQuery };
