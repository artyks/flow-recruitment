import { IsOptional, IsString, IsUUID } from 'class-validator';

class UpdateFormResponseAnswerValueParams {
  @IsUUID()
  id: string;
}

class UpdateFormResponseAnswerValueDto {
  @IsOptional()
  @IsString()
  newValue?: string | null; /** JSON string or null */
}

export { UpdateFormResponseAnswerValueDto, UpdateFormResponseAnswerValueParams };
