import { IsUUID } from 'class-validator';

class FindProductCategoryParams {
  @IsUUID()
  id: string;
}

export { FindProductCategoryParams };
