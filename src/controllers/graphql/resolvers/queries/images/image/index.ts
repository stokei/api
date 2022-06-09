import { Args, Query, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';
import { ImageNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Image)
export class ImageResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @Query(() => Image)
  async image(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const image = await this.imagesLoader.findByIds.load(id);
    if (!image) {
      throw new ImageNotFoundException();
    }
    return image;
  }
}
