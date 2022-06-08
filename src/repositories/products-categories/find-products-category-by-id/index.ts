import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { ProductsCategoryMapper } from '@/mappers/products-categories';
import { ProductsCategoryModel } from '@/models/products-category.model';

@Injectable()
export class FindProductsCategoryByIdRepository
  implements IBaseRepository<string, Promise<ProductsCategoryModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ProductsCategoryModel> {
    return new ProductsCategoryMapper().toModel(
      await this.model.productsCategory.findUnique({
        where: { id }
      })
    );
  }
}
