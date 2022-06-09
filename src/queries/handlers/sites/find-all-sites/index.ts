import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IPaginatedType,
  PaginationMapper,
  splitServiceId
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { SiteModel } from '@/models/site.model';
import { FindAllSitesQuery } from '@/queries/implements/sites/find-all-sites.query';
import { CountSitesRepository } from '@/repositories/sites/count-sites';
import { FindAllSitesRepository } from '@/repositories/sites/find-all-sites';

@QueryHandler(FindAllSitesQuery)
export class FindAllSitesQueryHandler
  implements IQueryHandler<FindAllSitesQuery>
{
  constructor(
    private readonly findAllSiteRepository: FindAllSitesRepository,
    private readonly countSitesRepository: CountSitesRepository
  ) {}

  async execute(query: FindAllSitesQuery): Promise<IPaginatedType<SiteModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const sites = await this.findAllSiteRepository.execute(data);
    const totalCount = await this.countSitesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<SiteModel>().toPaginationList({
      items: sites,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllSitesQuery): FindAllSitesQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataString(operatorData.parent),
          name: cleanWhereDataSearch(operatorData.name),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt)
      })
    };
  }
}
