import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { loadConfig } from './config/config';
import { FormsModule } from './forms/forms.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
    FormsModule,
    ProductCategoriesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
