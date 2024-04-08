import { Args, Query, Resolver } from '@nestjs/graphql';

import { PagesLoader } from '@/controllers/graphql/dataloaders/pages.loader';
import { Page } from '@/controllers/graphql/types/page';
import { PageNotFoundException, SiteNotFoundException } from '@/errors';
import { PageModel } from '@/models/page.model';
import { FindPageBySlugAndParentService } from '@/services/pages/find-page-by-slug-and-parent';

@Resolver(() => Page)
export class PageResolver {
  constructor(
    private readonly pagesLoader: PagesLoader,
    private readonly findPageBySlugAndParentService: FindPageBySlugAndParentService
  ) {}

  @Query(() => Page)
  async page(
    @Args('id', { nullable: true }) id: string,
    @Args('slug', { nullable: true }) slug: string,
    @Args('site', { nullable: true }) site: string
  ) {
    let pageModel: PageModel = null;
    if (id) {
      pageModel = await this.pagesLoader.findByIds.load(id);
    } else if (slug) {
      if (!site) {
        throw new SiteNotFoundException();
      }
      pageModel = await this.findPageBySlugAndParentService.execute({
        slug,
        parent: site
      });
    }
    if (!pageModel) {
      throw new PageNotFoundException();
    }
    return pageModel;
  }
}
