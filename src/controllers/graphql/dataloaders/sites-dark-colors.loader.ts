import { Injectable, Scope } from '@nestjs/common';
import { FindAllSitesDarkColorsService } from '@/services/sites-dark-colors/find-all-sites-dark-colors';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class SitesDarkColorsLoader {
  constructor(
    private readonly sitesDarkColorsService: FindAllSitesDarkColorsService
  ) {}

  readonly findByIds = new DataLoader(async (sitesDarkColorIds: string[]) => {
    const sitesDarkColors = await this.sitesDarkColorsService.execute({
      where: {
        AND: {
          ids: sitesDarkColorIds
        }
      }
    });
    const sitesDarkColorsMap = new Map(
      sitesDarkColors?.items?.map((sitesDarkColor) => [
        sitesDarkColor.id,
        sitesDarkColor
      ])
    );
    return sitesDarkColorIds.map((sitesDarkColorId) =>
      sitesDarkColorsMap.get(sitesDarkColorId)
    );
  });
}
