import { Args, Query, Resolver } from '@nestjs/graphql';
import { TagsLoader } from '@/controllers/graphql/dataloaders/tags.loader';
import { Tag } from '@/controllers/graphql/types/tag';
import { TagNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagsLoader: TagsLoader) {}

  @Query(() => Tag)
  async tag(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const tag = await this.tagsLoader.findByIds.load(id);
    if (!tag) {
      throw new TagNotFoundException();
    }
    return tag;
  }
}
