import { Resolver, ResolveReference } from '@nestjs/graphql';
import { FilesLoader } from '@/controllers/graphql/dataloaders/files.loader';
import { File } from '@/controllers/graphql/types/file';

@Resolver(() => File)
export class FileReferenceResolver {
  constructor(private readonly filesLoader: FilesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.filesLoader.findByIds.load(reference.id);
  }
}
