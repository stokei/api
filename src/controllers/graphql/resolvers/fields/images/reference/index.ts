import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';

@Resolver(() => Image)
export class ImageReferenceResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.imagesLoader.findByIds.load(reference.id);
  }
}
