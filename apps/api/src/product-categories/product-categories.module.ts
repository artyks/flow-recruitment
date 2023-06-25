import { Module } from '@nestjs/common';
import { ProductCategoriesController } from './controllers/product-categories/product-categories.controller';
import { ProductCategoriesService } from '@flow-recruitment/product-categories/services';

@Module({
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
})
export class ProductCategoriesModule {}
