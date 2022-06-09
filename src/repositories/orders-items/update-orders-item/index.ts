import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateOrdersItemDTO } from '@/dtos/orders-items/update-orders-item.dto';

@Injectable()
export class UpdateOrdersItemRepository
  implements IBaseRepository<UpdateOrdersItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateOrdersItemDTO): Promise<boolean> {
    const updated = await this.model.ordersItem.update({
      where: {
        id: where?.ordersItemId
      },
      data
    });
    return !!updated;
  }
}
