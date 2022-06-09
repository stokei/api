import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ProductsTagMapper } from '@/mappers/products-tags';
import { ProductsTagModel } from '@/models/products-tag.model';

@Injectable()
export class FindProductsTagByIdRepository
  implements IBaseRepository<string, Promise<ProductsTagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ProductsTagModel> {
    return new ProductsTagMapper().toModel(
      await this.model.productsTag.findUnique({
        where: { id }
      })
    );
  }
}
