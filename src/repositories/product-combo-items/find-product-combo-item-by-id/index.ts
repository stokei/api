import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ProductComboItemMapper } from '@/mappers/product-combo-items';
import { ProductComboItemModel } from '@/models/product-combo-item.model';

@Injectable()
export class FindProductComboItemByIdRepository
  implements IBaseRepository<string, Promise<ProductComboItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ProductComboItemModel> {
    return new ProductComboItemMapper().toModel(
      await this.model.productComboItem.findUnique({
        where: { id }
      })
    );
  }
}
