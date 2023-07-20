import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';
import { Material } from '@/controllers/graphql/types/material';
import { MaterialModel } from '@/models/material.model';

@Resolver(() => Material)
export class MaterialAvatarResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image, { nullable: true })
  avatar(@Parent() material: MaterialModel) {
    return material.avatar && this.imagesLoader.findByIds.load(material.avatar);
  }
}
