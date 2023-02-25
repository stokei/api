import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoiceCustomerAccountResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  async customerAccount(@Parent() invoice: InvoiceModel) {
    if (!invoice.customer) {
      return;
    }
    const isAccount =
      splitServiceId(invoice.customer)?.service ===
      ServerStokeiApiIdPrefix.ACCOUNTS;
    if (!isAccount) {
      return;
    }
    return await this.accountsLoader.findByIds.load(invoice.customer);
  }
}
