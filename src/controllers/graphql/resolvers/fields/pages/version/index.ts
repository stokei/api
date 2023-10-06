import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { VersionsLoader } from '@/controllers/graphql/dataloaders/versions.loader';
import { Page } from '@/controllers/graphql/types/page';
import { Version } from '@/controllers/graphql/types/version';
import { PageModel } from '@/models/page.model';

@Resolver(() => Page)
export class PageVersionResolver {
  constructor(private readonly versionsLoader: VersionsLoader) {}

  @ResolveField(() => Version, { nullable: true })
  version(@Parent() page: PageModel) {
    return page.version && this.versionsLoader.findByIds.load(page.version);
  }
}
