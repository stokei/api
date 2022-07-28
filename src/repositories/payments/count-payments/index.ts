import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountPaymentsDTO } from '@/dtos/payments/count-payments.dto';
import { PaymentMapper } from '@/mappers/payments';

@Injectable()
export class CountPaymentsRepository
  implements IBaseRepository<CountPaymentsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountPaymentsDTO): Promise<number> {
    const paymentMapper = new PaymentMapper();
    return await this.model.payment.count({
      where: paymentMapper.toWhereFindAllPrisma(where)
    });
  }
}
