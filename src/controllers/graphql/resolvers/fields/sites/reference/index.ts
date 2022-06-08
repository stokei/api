import { Resolver, ResolveReference } from '@nestjs/graphql';
import { SitesLoader } from '@/controllers/graphql/dataloaders/sites.loader';
import { Site } from '@/controllers/graphql/types/site';

@Resolver(() => Site)
export class SiteReferenceResolver {
  constructor(private readonly sitesLoader: SitesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.sitesLoader.findByIds.load(reference.id);
  }
}
