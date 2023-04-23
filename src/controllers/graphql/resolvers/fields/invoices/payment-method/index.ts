import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PaymentMethodsLoader } from '@/controllers/graphql/dataloaders/payment-methods.loader';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoicePaymentMethodResolver {
  constructor(private readonly paymentMethodsLoader: PaymentMethodsLoader) {}

  @ResolveField(() => PaymentMethod, { nullable: true })
  paymentMethod(@Parent() invoice: InvoiceModel) {
    return (
      invoice.paymentMethod &&
      this.paymentMethodsLoader.findByIds.load(invoice.paymentMethod)
    );
  }
}
