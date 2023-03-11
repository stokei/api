import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { HerosLoader } from '@/controllers/graphql/dataloaders/heros.loader';
import { App } from '@/controllers/graphql/types/app';
import { Hero } from '@/controllers/graphql/types/hero';
import { AppModel } from '@/models/app.model';

@Resolver(() => App)
export class AppHeroResolver {
  constructor(private readonly herosLoader: HerosLoader) {}

  @ResolveField(() => Hero, { nullable: true })
  hero(@Parent() app: AppModel) {
    return app.hero && this.herosLoader.findByIds.load(app.hero);
  }
}
