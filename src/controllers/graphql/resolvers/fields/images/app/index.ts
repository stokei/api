import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Image } from '@/controllers/graphql/types/image';
import { ImageModel } from '@/models/image.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Image)
export class ImageAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() image: ImageModel) {
    return this.findAppByIdService.execute(image.app);
  }
}
