import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCartItemDTO } from '@/dtos/cart-items/create-cart-item.dto';
import { CartItemMapper } from '@/mappers/cart-items';
import { CartItemModel } from '@/models/cart-item.model';

@Injectable()
export class CreateCartItemRepository
  implements IBaseRepository<CreateCartItemDTO, Promise<CartItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCartItemDTO): Promise<CartItemModel> {
    return new CartItemMapper().toModel(
      await this.model.cartItem.create({ data })
    );
  }
}
