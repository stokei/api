import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ChangePaymentToPaymentErrorRepositoryDTO } from '@/dtos/payments/change-payment-to-payment-error-repository.dto';

@Injectable()
export class ChangePaymentToPaymentErrorRepository
  implements
    IBaseRepository<ChangePaymentToPaymentErrorRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ChangePaymentToPaymentErrorRepositoryDTO): Promise<boolean> {
    const updated = await this.model.payment.update({
      where: {
        id: where?.payment
      },
      data
    });
    return !!updated;
  }
}
