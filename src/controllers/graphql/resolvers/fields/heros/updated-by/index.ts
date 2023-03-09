import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Hero } from '@/controllers/graphql/types/hero';
import { HeroModel } from '@/models/hero.model';

@Resolver(() => Hero)
export class HeroUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() hero: HeroModel) {
    return hero.updatedBy && this.accountsLoader.findByIds.load(hero.updatedBy);
  }
}
