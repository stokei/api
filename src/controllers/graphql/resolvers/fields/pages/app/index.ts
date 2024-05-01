import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Page } from '@/controllers/graphql/types/page';
import { PageModel } from '@/models/page.model';

@Resolver(() => Page)
export class PageAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() page: PageModel) {
    return page.app && this.appsLoader.findByIds.load(page.app);
  }
}
