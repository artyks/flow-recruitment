import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './services/product-categories/product-categories.service';

@Module({
  providers: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
