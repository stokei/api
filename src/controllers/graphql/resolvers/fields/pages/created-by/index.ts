import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Page } from '@/controllers/graphql/types/page';
import { PageModel } from '@/models/page.model';

@Resolver(() => Page)
export class PageCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() page: PageModel) {
    return page.createdBy && this.accountsLoader.findByIds.load(page.createdBy);
  }
}
