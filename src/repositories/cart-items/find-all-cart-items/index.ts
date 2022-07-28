import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCartItemsDTO } from '@/dtos/cart-items/find-all-cart-items.dto';
import { CartItemMapper } from '@/mappers/cart-items';
import { CartItemModel } from '@/models/cart-item.model';

@Injectable()
export class FindAllCartItemsRepository
  implements IBaseRepository<FindAllCartItemsDTO, Promise<CartItemModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCartItemsDTO): Promise<CartItemModel[]> {
    const cartItemMapper = new CartItemMapper();
    return cartItemMapper.toModels(
      await this.model.cartItem.findMany(cartItemMapper.toFindAllPrisma(data))
    );
  }
}
