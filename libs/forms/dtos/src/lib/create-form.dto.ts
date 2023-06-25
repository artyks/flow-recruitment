import { FormQuestionInputTypeEnum, FormType } from '@flow-recruitment/forms/constants';
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
  dependOnAnchor: string;

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
  @IsString({ each: true })
  choiceOptions?: string[];

  @IsOptional()
  @IsUUID()
  anchor?: string;

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

  @IsEnum(FormType)
  type: FormType;
}

export { CreateFormDto, CreateFormQuestionVisibilityRule, CreateFormQuestionDto };
