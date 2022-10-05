import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { FilesLoader } from '@/controllers/graphql/dataloaders/files.loader';
import { File } from '@/controllers/graphql/types/file';
import { Image } from '@/controllers/graphql/types/image';
import { ImageModel } from '@/models/image.model';

@Resolver(() => Image)
export class ImageFileResolver {
  constructor(private readonly filesLoader: FilesLoader) {}

  @ResolveField(() => File, { nullable: true })
  file(@Parent() image: ImageModel) {
    return image.file && this.filesLoader.findByIds.load(image.file);
  }
}
