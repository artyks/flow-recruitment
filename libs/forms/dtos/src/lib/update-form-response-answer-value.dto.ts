import { IsArray, IsString, IsUUID, NotEquals, ValidateIf } from 'class-validator';

class UpdateFormResponseAnswerValueParams {
  @IsUUID()
  id: string;
}

class UpdateFormResponseAnswerValueDto {
  @NotEquals(null)
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  newValueString?: string; /** e.g. single choice or text value */

  @NotEquals(null)
  @IsString({ each: true })
  @IsArray()
  @ValidateIf((_, value) => value !== undefined)
  newValueArrayString?: string[]; /** e.g. multiple choice value */
}

export { UpdateFormResponseAnswerValueDto, UpdateFormResponseAnswerValueParams };
