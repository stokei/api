import { IQuery } from '@nestjs/cqrs';

export class FindPaymentMethodByStripePaymentMethodQuery implements IQuery {
  constructor(readonly stripePaymentMethod: string) {}
}
