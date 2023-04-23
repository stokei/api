import { Resolver, ResolveReference } from '@nestjs/graphql';

import { InvoicesLoader } from '@/controllers/graphql/dataloaders/invoices.loader';
import { Invoice } from '@/controllers/graphql/types/invoice';

@Resolver(() => Invoice)
export class InvoiceReferenceResolver {
  constructor(private readonly invoicesLoader: InvoicesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.invoicesLoader.findByIds.load(reference.id);
  }
}
