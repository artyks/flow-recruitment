import { IsUUID } from 'class-validator';

class FindFormParams {
  @IsUUID()
  id: string;
}

export { FindFormParams };
