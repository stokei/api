import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { PaymentMapper } from '@/mappers/payments';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class FindPaymentByIdRepository
  implements IBaseRepository<string, Promise<PaymentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<PaymentModel> {
    return new PaymentMapper().toModel(
      await this.model.payment.findUnique({
        where: { id }
      })
    );
  }
}
