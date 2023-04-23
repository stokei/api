import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Hero } from '@/controllers/graphql/types/hero';
import { HeroModel } from '@/models/hero.model';

@Resolver(() => Hero)
export class HeroAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() hero: HeroModel) {
    return hero.app && this.appsLoader.findByIds.load(hero.app);
  }
}
