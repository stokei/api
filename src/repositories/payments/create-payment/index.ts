import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePaymentDTO } from '@/dtos/payments/create-payment.dto';
import { PaymentMapper } from '@/mappers/payments';
import { PaymentModel } from '@/models/payment.model';

@Injectable()
export class CreatePaymentRepository
  implements IBaseRepository<CreatePaymentDTO, Promise<PaymentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePaymentDTO): Promise<PaymentModel> {
    return new PaymentMapper().toModel(
      await this.model.payment.create({ data })
    );
  }
}
