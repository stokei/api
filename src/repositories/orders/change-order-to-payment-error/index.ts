import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ChangeOrderToPaymentErrorRepositoryDTO } from '@/dtos/orders/change-order-to-payment-error-repository.dto';

@Injectable()
export class ChangeOrderToPaymentErrorRepository
  implements
    IBaseRepository<ChangeOrderToPaymentErrorRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ChangeOrderToPaymentErrorRepositoryDTO): Promise<boolean> {
    const updated = await this.model.order.update({
      where: {
        id: where?.order
      },
      data
    });
    return !!updated;
  }
}
