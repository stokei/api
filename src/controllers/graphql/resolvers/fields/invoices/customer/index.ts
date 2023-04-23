import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import {
  Invoice,
  InvoiceCustomerUnion
} from '@/controllers/graphql/types/invoice';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoiceCustomerResolver {
  constructor(
    private readonly accountsLoader: AccountsLoader,
    private readonly appsLoader: AppsLoader
  ) {}

  @ResolveField(() => InvoiceCustomerUnion, { nullable: true })
  async customer(@Parent() invoiceCustomer: InvoiceModel) {
    const getCustomer = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.appsLoader.findByIds.load(invoiceCustomer.customer),
        [ServerStokeiApiIdPrefix.ACCOUNTS]: () =>
          this.accountsLoader.findByIds.load(invoiceCustomer.customer)
      };
      const serviceName = splitServiceId(invoiceCustomer.customer)?.service;
      return handlers?.[serviceName];
    };
    const getCustomerHandler = await getCustomer();
    return invoiceCustomer.customer && getCustomerHandler?.();
  }
}
