import { FormQuestionInputTypeEnum, FormType } from '@flow-recruitment/forms/constants';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  NotEquals,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class CreateFormQuestionVisibilityRule {
  @IsUUID()
  dependOnAnchor: string;

  @NotEquals(null)
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  requiredValueString?: string;

  @NotEquals(null)
  @IsArray()
  @IsString({ each: true })
  @ValidateIf((_, value) => value !== undefined)
  requiredValueArrayString?: string[];
}

class CreateFormQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(FormQuestionInputTypeEnum)
  inputType: FormQuestionInputTypeEnum;

  @NotEquals(null)
  @IsArray()
  @IsString({ each: true })
  @ValidateIf((_, value) => value !== undefined)
  choiceOptions?: string[];

  @NotEquals(null)
  @IsUUID()
  @ValidateIf((_, value) => value !== undefined)
  anchor?: string;

  @NotEquals(null)
  @IsArray()
  @ValidateNested({ each: true })
  @ValidateIf((_, value) => value !== undefined)
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
