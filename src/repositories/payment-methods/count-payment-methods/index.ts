import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountPaymentMethodsDTO } from '@/dtos/payment-methods/count-payment-methods.dto';
import { PaymentMethodMapper } from '@/mappers/payment-methods';

@Injectable()
export class CountPaymentMethodsRepository
  implements IBaseRepository<CountPaymentMethodsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountPaymentMethodsDTO): Promise<number> {
    const paymentMethodMapper = new PaymentMethodMapper();
    return await this.model.paymentMethod.count({
      where: paymentMethodMapper.toWhereFindAllPrisma(where)
    });
  }
}
