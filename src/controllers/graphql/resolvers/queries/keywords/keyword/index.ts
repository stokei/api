import { Args, Query, Resolver } from '@nestjs/graphql';

import { KeywordsLoader } from '@/controllers/graphql/dataloaders/keywords.loader';
import { Keyword } from '@/controllers/graphql/types/keyword';
import { KeywordNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Keyword)
export class KeywordResolver {
  constructor(private readonly keywordsLoader: KeywordsLoader) {}

  @Query(() => Keyword)
  async keyword(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const keyword = await this.keywordsLoader.findByIds.load(id);
    if (!keyword) {
      throw new KeywordNotFoundException();
    }
    return keyword;
  }
}
