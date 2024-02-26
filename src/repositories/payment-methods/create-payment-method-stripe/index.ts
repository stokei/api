import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePaymentMethodStripeRepositoryDTO } from '@/dtos/payment-methods/create-payment-method-stripe-repository.dto';
import { PaymentMethodMapper } from '@/mappers/payment-methods';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class CreatePaymentMethodStripeRepository
  implements
    IBaseRepository<
      CreatePaymentMethodStripeRepositoryDTO,
      Promise<PaymentMethodModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreatePaymentMethodStripeRepositoryDTO
  ): Promise<PaymentMethodModel> {
    return new PaymentMethodMapper().toModel(
      await this.model.paymentMethod.create({ data })
    );
  }
}
