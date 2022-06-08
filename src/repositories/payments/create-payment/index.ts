import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { PaymentMapper } from '@/mappers/payments';
import { CreatePaymentDTO } from '@/dtos/payments/create-payment.dto';
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
