import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ProductsImageMapper } from '@/mappers/products-images';
import { ProductsImageModel } from '@/models/products-image.model';

@Injectable()
export class FindProductsImageByIdRepository
  implements IBaseRepository<string, Promise<ProductsImageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ProductsImageModel> {
    return new ProductsImageMapper().toModel(
      await this.model.productsImage.findUnique({
        where: { id }
      })
    );
  }
}
