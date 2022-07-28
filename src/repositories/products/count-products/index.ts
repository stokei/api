import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountProductsDTO } from '@/dtos/products/count-products.dto';
import { ProductMapper } from '@/mappers/products';

@Injectable()
export class CountProductsRepository
  implements IBaseRepository<CountProductsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountProductsDTO): Promise<number> {
    const productMapper = new ProductMapper();
    return await this.model.product.count({
      where: productMapper.toWhereFindAllPrisma(where)
    });
  }
}
