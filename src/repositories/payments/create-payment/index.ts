import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePaymentRepositoryDTO } from '@/dtos/payments/create-payment-repository.dto';
import { PaymentMapper } from '@/mappers/payments';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class CreatePaymentRepository
  implements IBaseRepository<CreatePaymentRepositoryDTO, Promise<PaymentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePaymentRepositoryDTO): Promise<PaymentModel> {
    return new PaymentMapper().toModel(
      await this.model.payment.create({
        data: {
          ...data,
          feeAmount: data.feeAmount || 0
        }
      })
    );
  }
}
