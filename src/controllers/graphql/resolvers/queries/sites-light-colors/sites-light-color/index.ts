import { Args, Query, Resolver } from '@nestjs/graphql';
import { SitesLightColorsLoader } from '@/controllers/graphql/dataloaders/sites-light-colors.loader';
import { SitesLightColor } from '@/controllers/graphql/types/sites-light-color';
import {
  SitesLightColorNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => SitesLightColor)
export class SitesLightColorResolver {
  constructor(
    private readonly sitesLightColorsLoader: SitesLightColorsLoader
  ) {}

  @Query(() => SitesLightColor)
  async sitesLightColor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const sitesLightColor = await this.sitesLightColorsLoader.findByIds.load(
      id
    );
    if (!sitesLightColor) {
      throw new SitesLightColorNotFoundException();
    }
    return sitesLightColor;
  }
}
