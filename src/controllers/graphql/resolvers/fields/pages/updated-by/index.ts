import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Page } from '@/controllers/graphql/types/page';
import { PageModel } from '@/models/page.model';

@Resolver(() => Page)
export class PageUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() page: PageModel) {
    return page.updatedBy && this.accountsLoader.findByIds.load(page.updatedBy);
  }
}
