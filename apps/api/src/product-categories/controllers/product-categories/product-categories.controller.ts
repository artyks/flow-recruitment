import { Controller, Get, Param } from '@nestjs/common';
import { ENDPOINT_PRODUCT_CATEGORIES_SLUG } from '@flow-recruitment/product-categories/constants';
import { FindProductCategoryParams } from '@flow-recruitment/product-categories/dtos';
import { ProductCategoriesService } from '@flow-recruitment/product-categories/services';
import {
  FindManyProductCategoriesResult,
  FindOneProductCategoryResult,
} from '@flow-recruitment/product-categories/types';

@Controller(ENDPOINT_PRODUCT_CATEGORIES_SLUG)
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Get()
  async findAll(): Promise<FindManyProductCategoriesResult> {
    return await this.productCategoriesService.findMany();
  }

  @Get(':id')
  async findOneById(@Param() { id }: FindProductCategoryParams): Promise<FindOneProductCategoryResult> {
    return await this.productCategoriesService.findOne(id);
  }
}
