import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ChangeOrderToPendingRepositoryDTO } from '@/dtos/orders/change-order-to-pending-repository.dto';

@Injectable()
export class ChangeOrderToPendingRepository
  implements
    IBaseRepository<ChangeOrderToPendingRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ChangeOrderToPendingRepositoryDTO): Promise<boolean> {
    const updated = await this.model.order.update({
      where: {
        id: where?.order
      },
      data
    });
    return !!updated;
  }
}
