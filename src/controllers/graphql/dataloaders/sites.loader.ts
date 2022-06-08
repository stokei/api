import { Injectable, Scope } from '@nestjs/common';
import { FindAllSitesService } from '@/services/sites/find-all-sites';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class SitesLoader {
  constructor(private readonly sitesService: FindAllSitesService) {}

  readonly findByIds = new DataLoader(async (siteIds: string[]) => {
    const sites = await this.sitesService.execute({
      where: {
        AND: {
          ids: siteIds
        }
      }
    });
    const sitesMap = new Map(sites?.items?.map((site) => [site.id, site]));
    return siteIds.map((siteId) => sitesMap.get(siteId));
  });
}
