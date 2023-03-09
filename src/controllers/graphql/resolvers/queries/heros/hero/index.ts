import { Args, Query, Resolver } from '@nestjs/graphql';

import { HerosLoader } from '@/controllers/graphql/dataloaders/heros.loader';
import { Hero } from '@/controllers/graphql/types/hero';
import { HeroNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Hero)
export class HeroResolver {
  constructor(private readonly herosLoader: HerosLoader) {}

  @Query(() => Hero)
  async hero(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const hero = await this.herosLoader.findByIds.load(id);
    if (!hero) {
      throw new HeroNotFoundException();
    }
    return hero;
  }
}
