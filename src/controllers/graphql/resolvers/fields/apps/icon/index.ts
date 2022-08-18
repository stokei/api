import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { App } from '@/controllers/graphql/types/app';
import { Image } from '@/controllers/graphql/types/image';
import { AppModel } from '@/models/app.model';

@Resolver(() => App)
export class AppIconResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image, { nullable: true })
  icon(@Parent() app: AppModel) {
    return app.icon && this.imagesLoader.findByIds.load(app.icon);
  }
}
