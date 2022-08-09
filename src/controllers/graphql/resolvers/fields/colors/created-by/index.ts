import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Color } from '@/controllers/graphql/types/color';
import { ColorModel } from '@/models/color.model';

@Resolver(() => Color)
export class ColorCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() color: ColorModel) {
    return (
      color.createdBy && this.accountsLoader.findByIds.load(color.createdBy)
    );
  }
}
