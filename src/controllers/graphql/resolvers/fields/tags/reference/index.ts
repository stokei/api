import { Resolver, ResolveReference } from '@nestjs/graphql';
import { TagsLoader } from '@/controllers/graphql/dataloaders/tags.loader';
import { Tag } from '@/controllers/graphql/types/tag';

@Resolver(() => Tag)
export class TagReferenceResolver {
  constructor(private readonly tagsLoader: TagsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.tagsLoader.findByIds.load(reference.id);
  }
}
