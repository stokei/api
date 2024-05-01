import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  SiteNotFoundException
} from '@/errors';
import { DomainModel } from '@/models/domain.model';
import { FindAppCurrentDomainQuery } from '@/queries/implements/apps/find-app-current-domain.query';
import { FindAllSitesService } from '@/services/sites/find-all-sites';
import { FindSiteCurrentDomainService } from '@/services/sites/find-site-current-domain';

@QueryHandler(FindAppCurrentDomainQuery)
export class FindAppCurrentDomainQueryHandler
  implements IQueryHandler<FindAppCurrentDomainQuery>
{
  constructor(
    private readonly findSiteCurrentDomainService: FindSiteCurrentDomainService,
    private readonly findAllSitesService: FindAllSitesService
  ) {}

  async execute(query: FindAppCurrentDomainQuery): Promise<DomainModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const appId = cleanValue(query.appId);
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }
    const sites = await this.findAllSitesService.execute({
      where: {
        AND: {
          parent: {
            equals: appId
          }
        }
      }
    });
    const site = sites?.items?.[0];
    if (!site) {
      throw new SiteNotFoundException();
    }
    return await this.findSiteCurrentDomainService.execute(site.id);
  }
}
