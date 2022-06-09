import { Resolver, ResolveReference } from '@nestjs/graphql';

import { KeywordsLoader } from '@/controllers/graphql/dataloaders/keywords.loader';
import { Keyword } from '@/controllers/graphql/types/keyword';

@Resolver(() => Keyword)
export class KeywordReferenceResolver {
  constructor(private readonly keywordsLoader: KeywordsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.keywordsLoader.findByIds.load(reference.id);
  }
}
