import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountProductComboItemsDTO } from '@/dtos/product-combo-items/count-product-combo-items.dto';
import { ProductComboItemMapper } from '@/mappers/product-combo-items';

@Injectable()
export class CountProductComboItemsRepository
  implements IBaseRepository<CountProductComboItemsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountProductComboItemsDTO): Promise<number> {
    const productComboItemMapper = new ProductComboItemMapper();
    return await this.model.productComboItem.count({
      where: productComboItemMapper.toWhereFindAllPrisma(where)
    });
  }
}
