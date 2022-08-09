import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Color } from '@/controllers/graphql/types/color';
import { ColorModel } from '@/models/color.model';

@Resolver(() => Color)
export class ColorUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() color: ColorModel) {
    return (
      color.updatedBy && this.accountsLoader.findByIds.load(color.updatedBy)
    );
  }
}
