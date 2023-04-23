import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoiceAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() invoice: InvoiceModel) {
    return invoice.app && this.appsLoader.findByIds.load(invoice.app);
  }
}
