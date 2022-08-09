import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Product)
export class ProductCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() product: ProductModel) {
    return this.findAccountByIdService.execute(product.createdBy);
  }
}
