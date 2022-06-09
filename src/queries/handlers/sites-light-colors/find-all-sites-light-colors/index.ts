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
import { SitesLightColorModel } from '@/models/sites-light-color.model';
import { FindAllSitesLightColorsQuery } from '@/queries/implements/sites-light-colors/find-all-sites-light-colors.query';
import { CountSitesLightColorsRepository } from '@/repositories/sites-light-colors/count-sites-light-colors';
import { FindAllSitesLightColorsRepository } from '@/repositories/sites-light-colors/find-all-sites-light-colors';

@QueryHandler(FindAllSitesLightColorsQuery)
export class FindAllSitesLightColorsQueryHandler
  implements IQueryHandler<FindAllSitesLightColorsQuery>
{
  constructor(
    private readonly findAllSitesLightColorRepository: FindAllSitesLightColorsRepository,
    private readonly countSitesLightColorsRepository: CountSitesLightColorsRepository
  ) {}

  async execute(
    query: FindAllSitesLightColorsQuery
  ): Promise<IPaginatedType<SitesLightColorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const sitesLightColors =
      await this.findAllSitesLightColorRepository.execute(data);
    const totalCount = await this.countSitesLightColorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<SitesLightColorModel>().toPaginationList({
      items: sitesLightColors,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllSitesLightColorsQuery
  ): FindAllSitesLightColorsQuery {
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
