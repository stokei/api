import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateProductComboItemDTO } from '@/dtos/product-combo-items/create-product-combo-item.dto';
import { ProductComboItemMapper } from '@/mappers/product-combo-items';
import { ProductComboItemModel } from '@/models/product-combo-item.model';

@Injectable()
export class CreateProductComboItemRepository
  implements
    IBaseRepository<CreateProductComboItemDTO, Promise<ProductComboItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateProductComboItemDTO
  ): Promise<ProductComboItemModel> {
    return new ProductComboItemMapper().toModel(
      await this.model.productComboItem.create({ data })
    );
  }
}
