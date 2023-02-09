import { Args, Query, Resolver } from '@nestjs/graphql';

import { FeaturesLoader } from '@/controllers/graphql/dataloaders/features.loader';
import { Feature } from '@/controllers/graphql/types/feature';
import { FeatureNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Feature)
export class FeatureResolver {
  constructor(private readonly featuresLoader: FeaturesLoader) {}

  @Query(() => Feature)
  async feature(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const feature = await this.featuresLoader.findByIds.load(id);
    if (!feature) {
      throw new FeatureNotFoundException();
    }
    return feature;
  }
}
