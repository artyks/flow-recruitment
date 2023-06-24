import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './services/product-categories/product-categories.service';
import { ProductCategoriesController } from './controllers/product-categories/product-categories.controller';

@Module({
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
})
export class ProductCategoriesModule {}
