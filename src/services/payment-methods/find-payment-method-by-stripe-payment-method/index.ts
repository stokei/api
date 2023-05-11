import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindPaymentMethodByStripePaymentMethodQuery } from '@/queries/implements/payment-methods/find-payment-method-by-stripe-payment-method.query';

@Injectable()
export class FindPaymentMethodByStripePaymentMethodService
  implements IBaseService<string, Promise<PaymentMethodModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PaymentMethodModel> {
    return await this.queryBus.execute(
      new FindPaymentMethodByStripePaymentMethodQuery(data)
    );
  }
}
