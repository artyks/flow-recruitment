import { Controller, Get, Param } from '@nestjs/common';
import { ProductCategoriesService } from '../../services/product-categories/product-categories.service';
import { ENDPOINT_PRODUCT_CATEGORIES_SLUG } from '@flow-recruitment/product-categories/constants';
import { FindProductCategoryParams } from '@flow-recruitment/product-categories/dtos';

@Controller(ENDPOINT_PRODUCT_CATEGORIES_SLUG)
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) {}

  @Get()
  async findAll() {
    return await this.productCategoriesService.findMany();
  }

  @Get(':id')
  async findOneById(@Param() { id }: FindProductCategoryParams) {
    return await this.productCategoriesService.findOne(id);
  }
}
