import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  SiteNotFoundException
} from '@/errors';
import { DomainModel } from '@/models/domain.model';
import { FindSiteCurrentDomainQuery } from '@/queries/implements/sites/find-site-current-domain.query';
import { FindAllDomainsService } from '@/services/domains/find-all-domains';
import { FindDomainByIdService } from '@/services/domains/find-domain-by-id';
import { FindSiteByIdService } from '@/services/sites/find-site-by-id';
import { getSiteStokeiDomain } from '@/utils/get-site-stokei-domain';

@QueryHandler(FindSiteCurrentDomainQuery)
export class FindSiteCurrentDomainQueryHandler
  implements IQueryHandler<FindSiteCurrentDomainQuery>
{
  constructor(
    private readonly findSiteByIdService: FindSiteByIdService,
    private readonly findDomainByIdService: FindDomainByIdService,
    private readonly findAllDomainsService: FindAllDomainsService
  ) {}

  async execute(query: FindSiteCurrentDomainQuery): Promise<DomainModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const siteId = cleanValue(query.siteId);
    if (!siteId) {
      throw new ParamNotFoundException('siteId');
    }

    const site = await this.findSiteByIdService.execute(siteId);
    if (!site) {
      throw new SiteNotFoundException();
    }
    let currentSiteDomain: DomainModel;
    if (site.defaultDomain) {
      try {
        currentSiteDomain = await this.findDomainByIdService.execute(
          site.defaultDomain
        );
        if (!currentSiteDomain?.active) {
          currentSiteDomain = null;
        }
      } catch (error) {}
    }
    if (!currentSiteDomain) {
      const domains = await this.findAllDomainsService.execute({
        where: {
          AND: {
            parent: {
              equals: site.id
            },
            active: {
              equals: true
            }
          }
        },
        page: {
          limit: 1
        }
      });
      if (domains?.items?.length > 0 && domains?.items[0]) {
        currentSiteDomain = domains?.items[0];
      } else {
        currentSiteDomain = null;
      }
    }
    return currentSiteDomain || getSiteStokeiDomain({ site });
  }
}
