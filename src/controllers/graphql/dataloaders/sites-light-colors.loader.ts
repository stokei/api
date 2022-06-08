import { Injectable, Scope } from '@nestjs/common';
import { FindAllSitesLightColorsService } from '@/services/sites-light-colors/find-all-sites-light-colors';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class SitesLightColorsLoader {
  constructor(
    private readonly sitesLightColorsService: FindAllSitesLightColorsService
  ) {}

  readonly findByIds = new DataLoader(async (sitesLightColorIds: string[]) => {
    const sitesLightColors = await this.sitesLightColorsService.execute({
      where: {
        AND: {
          ids: sitesLightColorIds
        }
      }
    });
    const sitesLightColorsMap = new Map(
      sitesLightColors?.items?.map((sitesLightColor) => [
        sitesLightColor.id,
        sitesLightColor
      ])
    );
    return sitesLightColorIds.map((sitesLightColorId) =>
      sitesLightColorsMap.get(sitesLightColorId)
    );
  });
}
