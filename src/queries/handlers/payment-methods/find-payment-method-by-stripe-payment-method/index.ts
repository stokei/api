import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException
} from '@/errors';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindPaymentMethodByStripePaymentMethodQuery } from '@/queries/implements/payment-methods/find-payment-method-by-stripe-payment-method.query';
import { FindPaymentMethodByStripePaymentMethodRepository } from '@/repositories/payment-methods/find-payment-method-by-stripe-payment-method';

@QueryHandler(FindPaymentMethodByStripePaymentMethodQuery)
export class FindPaymentMethodByStripePaymentMethodQueryHandler
  implements IQueryHandler<FindPaymentMethodByStripePaymentMethodQuery>
{
  constructor(
    private readonly findPaymentMethodByStripePaymentMethodRepository: FindPaymentMethodByStripePaymentMethodRepository
  ) {}

  async execute(
    query: FindPaymentMethodByStripePaymentMethodQuery
  ): Promise<PaymentMethodModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const stripePaymentMethod = cleanValue(query.stripePaymentMethod);
    if (!stripePaymentMethod) {
      throw new ParamNotFoundException('stripePaymentMethod');
    }

    const paymentMethod =
      await this.findPaymentMethodByStripePaymentMethodRepository.execute(
        stripePaymentMethod
      );
    if (!paymentMethod) {
      throw new PaymentMethodNotFoundException();
    }
    return paymentMethod;
  }
}
