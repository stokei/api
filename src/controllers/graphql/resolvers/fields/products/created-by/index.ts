import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() product: ProductModel) {
    return (
      product.createdBy && this.accountsLoader.findByIds.load(product.createdBy)
    );
  }
}
