import { Resolver, ResolveReference } from '@nestjs/graphql';

import { PagesLoader } from '@/controllers/graphql/dataloaders/pages.loader';
import { Page } from '@/controllers/graphql/types/page';

@Resolver(() => Page)
export class PageReferenceResolver {
  constructor(private readonly pagesLoader: PagesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.pagesLoader.findByIds.load(reference.id);
  }
}
