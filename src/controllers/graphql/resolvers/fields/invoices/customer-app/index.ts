import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoiceCustomerAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  async customerApp(@Parent() invoice: InvoiceModel) {
    if (!invoice.customer) {
      return;
    }
    const isApp =
      splitServiceId(invoice.customer)?.service ===
      ServerStokeiApiIdPrefix.APPS;
    if (!isApp) {
      return;
    }
    return await this.appsLoader.findByIds.load(invoice.customer);
  }
}
