import { IQuery } from '@nestjs/cqrs';

export class FindInvoiceByStripeInvoiceQuery implements IQuery {
  constructor(readonly stripeInvoice: string) {}
}
