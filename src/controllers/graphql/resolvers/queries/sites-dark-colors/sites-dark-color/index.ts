import { Args, Query, Resolver } from '@nestjs/graphql';

import { SitesDarkColorsLoader } from '@/controllers/graphql/dataloaders/sites-dark-colors.loader';
import { SitesDarkColor } from '@/controllers/graphql/types/sites-dark-color';
import {
  ParamNotFoundException,
  SitesDarkColorNotFoundException
} from '@/errors';

@Resolver(() => SitesDarkColor)
export class SitesDarkColorResolver {
  constructor(private readonly sitesDarkColorsLoader: SitesDarkColorsLoader) {}

  @Query(() => SitesDarkColor)
  async sitesDarkColor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const sitesDarkColor = await this.sitesDarkColorsLoader.findByIds.load(id);
    if (!sitesDarkColor) {
      throw new SitesDarkColorNotFoundException();
    }
    return sitesDarkColor;
  }
}
