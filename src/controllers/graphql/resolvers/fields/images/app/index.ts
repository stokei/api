import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Image } from '@/controllers/graphql/types/image';
import { ImageModel } from '@/models/image.model';

@Resolver(() => Image)
export class ImageAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() image: ImageModel) {
    return image.app && this.appsLoader.findByIds.load(image.app);
  }
}
