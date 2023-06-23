import { FormQuestionInputTypeEnum } from '@flow-recruitment/forms/constants';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class CreateFormQuestionVisibilityRule {
  @IsUUID()
  questionId: string;

  @IsUUID()
  dependOnQuestionId: string;

  @IsString()
  @IsNotEmpty()
  requiredValue: string;
}

class CreateFormQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(FormQuestionInputTypeEnum)
  inputType: FormQuestionInputTypeEnum;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  visibilityRules?: CreateFormQuestionVisibilityRule[];
}

class CreateFormDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  questions: CreateFormQuestionDto[];
}

export { CreateFormDto };
