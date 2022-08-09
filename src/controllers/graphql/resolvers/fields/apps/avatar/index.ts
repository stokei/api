import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { App } from '@/controllers/graphql/types/app';
import { Image } from '@/controllers/graphql/types/image';
import { AppModel } from '@/models/app.model';

@Resolver(() => App)
export class AppAvatarResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image, { nullable: true })
  avatar(@Parent() app: AppModel) {
    return app.avatar && this.imagesLoader.findByIds.load(app.avatar);
  }
}
