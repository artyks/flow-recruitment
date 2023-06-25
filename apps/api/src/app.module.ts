import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { loadConfig } from './config/config';
import { FormsModule } from './forms/forms.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from '@flow-recruitment/prisma/client';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
    FormsModule,
    ProductCategoriesModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
