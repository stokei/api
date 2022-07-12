import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CartItemMapper } from '@/mappers/cart-items';
import { CartItemModel } from '@/models/cart-item.model';

@Injectable()
export class FindCartItemByIdRepository
  implements IBaseRepository<string, Promise<CartItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CartItemModel> {
    return new CartItemMapper().toModel(
      await this.model.cartItem.findUnique({
        where: { id }
      })
    );
  }
}
