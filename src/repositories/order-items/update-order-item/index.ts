import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateOrderItemDTO } from '@/dtos/order-items/update-order-item.dto';

@Injectable()
export class UpdateOrderItemRepository
  implements IBaseRepository<UpdateOrderItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateOrderItemDTO): Promise<boolean> {
    const updated = await this.model.orderItem.update({
      where: {
        id: where?.orderItem
      },
      data
    });
    return !!updated;
  }
}
