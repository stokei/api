import { Args, Query, Resolver } from '@nestjs/graphql';

import { PagesLoader } from '@/controllers/graphql/dataloaders/pages.loader';
import { Page } from '@/controllers/graphql/types/page';
import { PageNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Page)
export class PageResolver {
  constructor(private readonly pagesLoader: PagesLoader) {}

  @Query(() => Page)
  async page(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const page = await this.pagesLoader.findByIds.load(id);
    if (!page) {
      throw new PageNotFoundException();
    }
    return page;
  }
}
