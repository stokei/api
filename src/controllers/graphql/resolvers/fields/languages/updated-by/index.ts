import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Language } from '@/controllers/graphql/types/language';
import { LanguageModel } from '@/models/language.model';

@Resolver(() => Language)
export class LanguageUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() language: LanguageModel) {
    return (
      language.updatedBy &&
      this.accountsLoader.findByIds.load(language.updatedBy)
    );
  }
}
