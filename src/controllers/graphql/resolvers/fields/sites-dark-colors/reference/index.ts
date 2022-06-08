import { Resolver, ResolveReference } from '@nestjs/graphql';
import { SitesDarkColorsLoader } from '@/controllers/graphql/dataloaders/sites-dark-colors.loader';
import { SitesDarkColor } from '@/controllers/graphql/types/sites-dark-color';

@Resolver(() => SitesDarkColor)
export class SitesDarkColorReferenceResolver {
  constructor(private readonly sitesDarkColorsLoader: SitesDarkColorsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.sitesDarkColorsLoader.findByIds.load(reference.id);
  }
}
