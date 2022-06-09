import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCartsItemDTO } from '@/dtos/carts-items/remove-carts-item.dto';

@Injectable()
export class RemoveCartsItemRepository
  implements IBaseRepository<RemoveCartsItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCartsItemDTO): Promise<boolean> {
    const removed = await this.model.cartsItem.delete({
      where: {
        id: where?.cartsItemId
      }
    });
    return !!removed;
  }
}
