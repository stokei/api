import { Resolver, ResolveReference } from '@nestjs/graphql';

import { HerosLoader } from '@/controllers/graphql/dataloaders/heros.loader';
import { Hero } from '@/controllers/graphql/types/hero';

@Resolver(() => Hero)
export class HeroReferenceResolver {
  constructor(private readonly herosLoader: HerosLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.herosLoader.findByIds.load(reference.id);
  }
}
