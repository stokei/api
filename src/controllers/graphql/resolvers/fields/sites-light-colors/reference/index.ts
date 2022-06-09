import { Resolver, ResolveReference } from '@nestjs/graphql';

import { SitesLightColorsLoader } from '@/controllers/graphql/dataloaders/sites-light-colors.loader';
import { SitesLightColor } from '@/controllers/graphql/types/sites-light-color';

@Resolver(() => SitesLightColor)
export class SitesLightColorReferenceResolver {
  constructor(
    private readonly sitesLightColorsLoader: SitesLightColorsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.sitesLightColorsLoader.findByIds.load(reference.id);
  }
}
