import { ProductCategory } from '@flow-recruitment/prisma/client';

type FindManyProductCategoriesResult = ProductCategory[];
type FindOneProductCategoryResult = ProductCategory;

export type { FindManyProductCategoriesResult, FindOneProductCategoryResult };
