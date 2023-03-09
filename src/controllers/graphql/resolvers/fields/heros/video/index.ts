import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { VideosLoader } from '@/controllers/graphql/dataloaders/videos.loader';
import { Hero } from '@/controllers/graphql/types/hero';
import { Video } from '@/controllers/graphql/types/video';
import { HeroModel } from '@/models/hero.model';

@Resolver(() => Hero)
export class HeroVideoResolver {
  constructor(private readonly videosLoader: VideosLoader) {}

  @ResolveField(() => Video, { nullable: true })
  video(@Parent() hero: HeroModel) {
    return hero.video && this.videosLoader.findByIds.load(hero.video);
  }
}
