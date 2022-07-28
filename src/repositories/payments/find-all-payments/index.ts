import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllPaymentsDTO } from '@/dtos/payments/find-all-payments.dto';
import { PaymentMapper } from '@/mappers/payments';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class FindAllPaymentsRepository
  implements IBaseRepository<FindAllPaymentsDTO, Promise<PaymentModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllPaymentsDTO): Promise<PaymentModel[]> {
    const paymentMapper = new PaymentMapper();
    return paymentMapper.toModels(
      await this.model.payment.findMany(paymentMapper.toFindAllPrisma(data))
    );
  }
}
