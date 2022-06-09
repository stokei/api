import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ProductMapper } from '@/mappers/products';
import { ProductModel } from '@/models/product.model';

@Injectable()
export class FindProductByIdRepository
  implements IBaseRepository<string, Promise<ProductModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ProductModel> {
    return new ProductMapper().toModel(
      await this.model.product.findUnique({
        where: { id }
      })
    );
  }
}
