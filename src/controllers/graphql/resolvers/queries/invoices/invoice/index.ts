import { Args, Query, Resolver } from '@nestjs/graphql';

import { InvoicesLoader } from '@/controllers/graphql/dataloaders/invoices.loader';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { InvoiceNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoicesLoader: InvoicesLoader) {}

  @Query(() => Invoice)
  async invoice(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const invoice = await this.invoicesLoader.findByIds.load(id);
    if (!invoice) {
      throw new InvoiceNotFoundException();
    }
    return invoice;
  }
}
