import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Phone } from '@/controllers/graphql/types/phone';
import { PhoneModel } from '@/models/phone.model';

@Resolver(() => Phone)
export class PhoneCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() phone: PhoneModel) {
    return (
      phone.createdBy && this.accountsLoader.findByIds.load(phone.createdBy)
    );
  }
}
