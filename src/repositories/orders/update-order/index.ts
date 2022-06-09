import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateOrderDTO } from '@/dtos/orders/update-order.dto';

@Injectable()
export class UpdateOrderRepository
  implements IBaseRepository<UpdateOrderDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateOrderDTO): Promise<boolean> {
    const updated = await this.model.order.update({
      where: {
        id: where?.orderId
      },
      data
    });
    return !!updated;
  }
}
