import { IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';

class CreateFormResponseAnswerDto {
  @IsUUID()
  questionId: string;
}

class CreateFormResponseDto {
  @IsUUID()
  formId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  answers?: CreateFormResponseAnswerDto[];
}

export { CreateFormResponseDto };
