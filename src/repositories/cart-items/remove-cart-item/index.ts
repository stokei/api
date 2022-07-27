import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCartItemDTO } from '@/dtos/cart-items/remove-cart-item.dto';

@Injectable()
export class RemoveCartItemRepository
  implements IBaseRepository<RemoveCartItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCartItemDTO): Promise<boolean> {
    const removed = await this.model.cartItem.delete({
      where: {
        id: where?.cartItem
      }
    });
    return !!removed;
  }
}
