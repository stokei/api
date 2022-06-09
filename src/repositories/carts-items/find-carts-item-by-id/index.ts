import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CartsItemMapper } from '@/mappers/carts-items';
import { CartsItemModel } from '@/models/carts-item.model';

@Injectable()
export class FindCartsItemByIdRepository
  implements IBaseRepository<string, Promise<CartsItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CartsItemModel> {
    return new CartsItemMapper().toModel(
      await this.model.cartsItem.findUnique({
        where: { id }
      })
    );
  }
}
