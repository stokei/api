import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { RecurringsLoader } from '@/controllers/graphql/dataloaders/recurrings.loader';
import { Price } from '@/controllers/graphql/types/price';
import { Recurring } from '@/controllers/graphql/types/recurring';
import { PriceModel } from '@/models/price.model';

@Resolver(() => Price)
export class PriceRecurringResolver {
  constructor(private readonly recurringsLoader: RecurringsLoader) {}

  @ResolveField(() => Recurring, { nullable: true })
  recurring(@Parent() price: PriceModel) {
    return (
      price.recurring && this.recurringsLoader.findByIds.load(price.recurring)
    );
  }
}
