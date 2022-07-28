import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllProductsDTO } from '@/dtos/products/find-all-products.dto';
import { ProductMapper } from '@/mappers/products';
import { ProductModel } from '@/models/product.model';

@Injectable()
export class FindAllProductsRepository
  implements IBaseRepository<FindAllProductsDTO, Promise<ProductModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllProductsDTO): Promise<ProductModel[]> {
    const productMapper = new ProductMapper();
    return productMapper.toModels(
      await this.model.product.findMany(productMapper.toFindAllPrisma(data))
    );
  }
}
