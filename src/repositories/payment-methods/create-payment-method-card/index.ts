import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePaymentMethodCardRepositoryDTO } from '@/dtos/payment-methods/create-payment-method-card-repository.dto';
import { PaymentMethodMapper } from '@/mappers/payment-methods';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodCardRepository
  implements
    IBaseRepository<
      CreatePaymentMethodCardRepositoryDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreatePaymentMethodCardRepositoryDTO
  ): Promise<PaymentMethodModel> {
    return new PaymentMethodMapper().toModel(
      await this.model.paymentMethod.create({ data })
    );
  }
}
