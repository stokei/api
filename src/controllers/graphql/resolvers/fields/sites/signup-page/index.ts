import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PagesLoader } from '@/controllers/graphql/dataloaders/pages.loader';
import { Page } from '@/controllers/graphql/types/page';
import { Site } from '@/controllers/graphql/types/site';
import { SiteModel } from '@/models/site.model';

@Resolver(() => Site)
export class SiteSignUpPageResolver {
  constructor(private readonly pagesLoader: PagesLoader) {}

  @ResolveField(() => Page, { nullable: true })
  signUpPage(@Parent() site: SiteModel) {
    return site.signUpPage && this.pagesLoader.findByIds.load(site.signUpPage);
  }
}
