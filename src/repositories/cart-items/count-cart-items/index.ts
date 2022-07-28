import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCartItemsDTO } from '@/dtos/cart-items/count-cart-items.dto';
import { CartItemMapper } from '@/mappers/cart-items';

@Injectable()
export class CountCartItemsRepository
  implements IBaseRepository<CountCartItemsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCartItemsDTO): Promise<number> {
    const cartItemMapper = new CartItemMapper();
    return await this.model.cartItem.count({
      where: cartItemMapper.toWhereFindAllPrisma(where)
    });
  }
}
