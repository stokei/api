import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { Product } from '@/controllers/graphql/types/product';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoiceProductResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @ResolveField(() => Product, { nullable: true })
  product(@Parent() invoice: InvoiceModel) {
    return (
      invoice.product && this.productsLoader.findByIds.load(invoice.product)
    );
  }
}
