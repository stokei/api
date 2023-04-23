import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoiceCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() invoice: InvoiceModel) {
    return (
      invoice.createdBy && this.accountsLoader.findByIds.load(invoice.createdBy)
    );
  }
}
