import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  formPurchaseId: string;

  @IsUUID()
  formSearchId: string;
}

export { CreateProductCategoryDto };
