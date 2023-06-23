import { PrismaClientService } from '@flow-recruitment/prisma';
import { CreateProductCategoryDto } from '@flow-recruitment/product-categories/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductCategoriesService {
  private readonly repository: PrismaClientService['productCategory'];

  constructor(prisma: PrismaClientService) {
    this.repository = prisma.productCategory;
  }

  async findOne(id: string) {
    return await this.repository.findUnique({ where: { id } });
  }

  async findMany() {
    return await this.repository.findMany();
  }

  async createOne(payload: CreateProductCategoryDto) {
    return await this.repository.create({
      data: {
        name: payload.name,
        formPurchase: { connect: { id: payload.formPurchaseId } },
        formSearch: { connect: { id: payload.formSearchId } },
      },
    });
  }
}
