import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { Price } from '@/controllers/graphql/types/price';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoicePriceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @ResolveField(() => Price, { nullable: true })
  price(@Parent() invoice: InvoiceModel) {
    return invoice.price && this.pricesLoader.findByIds.load(invoice.price);
  }
}
