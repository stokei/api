import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ChangePaymentToPaidRepositoryDTO } from '@/dtos/payments/change-payment-to-paid-repository.dto';

@Injectable()
export class ChangePaymentToPaidRepository
  implements
    IBaseRepository<ChangePaymentToPaidRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: ChangePaymentToPaidRepositoryDTO): Promise<boolean> {
    const updated = await this.model.payment.update({
      where: {
        id: where?.payment
      },
      data
    });
    return !!updated;
  }
}
