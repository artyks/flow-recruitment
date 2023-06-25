import { PrismaClientService } from '@flow-recruitment/prisma/client';
import { PrismaTransactionExtandable } from '@flow-recruitment/prisma/utilities';
import { CreateProductCategoryDto } from '@flow-recruitment/product-categories/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductCategoriesService implements PrismaTransactionExtandable {
  constructor(private readonly prisma: PrismaClientService) {}

  /**
   * Allows other services inject prisma transaction client for handling transaction among services
   */
  getThis() {
    return this;
  }

  async findOne(id: string) {
    return await this.prisma.productCategory.findUnique({ where: { id } });
  }

  async findMany() {
    return await this.prisma.productCategory.findMany();
  }

  async createOne(payload: CreateProductCategoryDto) {
    return await this.prisma.productCategory.create({
      data: {
        name: payload.name,
        formPurchase: { connect: { id: payload.formPurchaseId } },
        formSearch: { connect: { id: payload.formSearchId } },
      },
    });
  }
}
