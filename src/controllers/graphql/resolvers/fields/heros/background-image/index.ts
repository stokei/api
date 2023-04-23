import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Hero } from '@/controllers/graphql/types/hero';
import { Image } from '@/controllers/graphql/types/image';
import { HeroModel } from '@/models/hero.model';

@Resolver(() => Hero)
export class HeroBackgroundImageResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image, { nullable: true })
  backgroundImage(@Parent() hero: HeroModel) {
    return (
      hero.backgroundImage &&
      this.imagesLoader.findByIds.load(hero.backgroundImage)
    );
  }
}
