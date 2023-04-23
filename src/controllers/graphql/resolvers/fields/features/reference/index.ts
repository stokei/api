import { Resolver, ResolveReference } from '@nestjs/graphql';

import { FeaturesLoader } from '@/controllers/graphql/dataloaders/features.loader';
import { Feature } from '@/controllers/graphql/types/feature';

@Resolver(() => Feature)
export class FeatureReferenceResolver {
  constructor(private readonly featuresLoader: FeaturesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.featuresLoader.findByIds.load(reference.id);
  }
}
