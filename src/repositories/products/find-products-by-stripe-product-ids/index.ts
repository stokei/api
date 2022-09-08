import { Injectable } from '@nestjs/common';
import { IBaseRepository, PrismaMapper } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ProductMapper } from '@/mappers/products';
import { ProductModel } from '@/models/product.model';

@Injectable()
export class FindProductsByStripeProductIdsRepository
  implements IBaseRepository<string[], Promise<ProductModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(ids: string[]): Promise<ProductModel[]> {
    const prismaMapper = new PrismaMapper();
    return new ProductMapper().toModels(
      await this.model.product.findMany({
        where: { stripeProduct: prismaMapper.toWhereIds(ids) }
      })
    );
  }
}
