import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { PaymentMethodMapper } from '@/mappers/payment-methods';
import { PaymentMethodModel } from '@/models/payment-method.model';

@Injectable()
export class FindPaymentMethodByStripePaymentMethodRepository
  implements IBaseRepository<string, Promise<PaymentMethodModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(stripePaymentMethod: string): Promise<PaymentMethodModel> {
    return new PaymentMethodMapper().toModel(
      await this.model.paymentMethod.findFirst({
        where: { stripePaymentMethod }
      })
    );
  }
}
