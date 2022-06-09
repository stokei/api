import { Resolver, ResolveReference } from '@nestjs/graphql';

import { MetatagsLoader } from '@/controllers/graphql/dataloaders/metatags.loader';
import { Metatag } from '@/controllers/graphql/types/metatag';

@Resolver(() => Metatag)
export class MetatagReferenceResolver {
  constructor(private readonly metatagsLoader: MetatagsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.metatagsLoader.findByIds.load(reference.id);
  }
}
