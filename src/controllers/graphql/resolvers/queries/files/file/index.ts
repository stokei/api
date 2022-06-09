import { Args, Query, Resolver } from '@nestjs/graphql';

import { FilesLoader } from '@/controllers/graphql/dataloaders/files.loader';
import { File } from '@/controllers/graphql/types/file';
import { FileNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly filesLoader: FilesLoader) {}

  @Query(() => File)
  async file(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const file = await this.filesLoader.findByIds.load(id);
    if (!file) {
      throw new FileNotFoundException();
    }
    return file;
  }
}
