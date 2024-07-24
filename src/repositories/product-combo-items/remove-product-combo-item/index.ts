import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveProductComboItemDTO } from '@/dtos/product-combo-items/remove-product-combo-item.dto';

@Injectable()
export class RemoveProductComboItemRepository
  implements IBaseRepository<RemoveProductComboItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveProductComboItemDTO): Promise<boolean> {
    const removed = await this.model.productComboItem.deleteMany({
      where: {
        app: where?.app,
        parent: where?.parent,
        product: where?.product
      }
    });
    return removed?.count > 0;
  }
}
