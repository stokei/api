import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { DomainModel } from '@/models/domain.model';
import { FindAppCurrentDomainQuery } from '@/queries/implements/apps/find-app-current-domain.query';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllDomainsService } from '@/services/domains/find-all-domains';

@QueryHandler(FindAppCurrentDomainQuery)
export class FindAppCurrentDomainQueryHandler
  implements IQueryHandler<FindAppCurrentDomainQuery>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAllDomainsService: FindAllDomainsService
  ) {}

  async execute(query: FindAppCurrentDomainQuery): Promise<DomainModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const appId = cleanValue(query.appId);
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }

    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }

    const domains = await this.findAllDomainsService.execute({
      where: {
        AND: {
          app: {
            equals: app.id
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
    const currentAppDomain = domains?.items?.length > 0 && domains?.items[0];
    if (!currentAppDomain) {
      return null;
    }
    return currentAppDomain;
  }
}
