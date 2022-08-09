import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Language } from '@/controllers/graphql/types/language';
import { LanguageModel } from '@/models/language.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Language)
export class LanguageCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() language: LanguageModel) {
    return this.findAccountByIdService.execute(language.createdBy);
  }
}
