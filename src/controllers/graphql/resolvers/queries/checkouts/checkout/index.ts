import { Args, Query, Resolver } from '@nestjs/graphql';

import { CheckoutsLoader } from '@/controllers/graphql/dataloaders/checkouts.loader';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { CheckoutNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Checkout)
export class CheckoutResolver {
  constructor(private readonly checkoutsLoader: CheckoutsLoader) {}

  @Query(() => Checkout)
  async checkout(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const checkout = await this.checkoutsLoader.findByIds.load(id);
    if (!checkout) {
      throw new CheckoutNotFoundException();
    }
    return checkout;
  }
}
