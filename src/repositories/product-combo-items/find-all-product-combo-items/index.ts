import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllProductComboItemsDTO } from '@/dtos/product-combo-items/find-all-product-combo-items.dto';
import { ProductComboItemMapper } from '@/mappers/product-combo-items';
import { ProductComboItemModel } from '@/models/product-combo-item.model';

@Injectable()
export class FindAllProductComboItemsRepository
  implements
    IBaseRepository<
      FindAllProductComboItemsDTO,
      Promise<ProductComboItemModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllProductComboItemsDTO
  ): Promise<ProductComboItemModel[]> {
    const productComboItemMapper = new ProductComboItemMapper();
    return productComboItemMapper.toModels(
      await this.model.productComboItem.findMany(
        productComboItemMapper.toFindAllPrisma(data)
      )
    );
  }
}
