import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IOperator,
  IPaginatedType,
  PaginationMapper,
  cleanObject,
  cleanSortValue,
  cleanValueNumber,
  cleanWhereDataString,
  cleanWhereDataSearch,
  cleanValue,
  splitServiceId
} from '@stokei/nestjs';
import { DataNotFoundException } from '@/errors';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';
import { FindAllSitesDarkColorsQuery } from '@/queries/implements/sites-dark-colors/find-all-sites-dark-colors.query';
import { CountSitesDarkColorsRepository } from '@/repositories/sites-dark-colors/count-sites-dark-colors';
import { FindAllSitesDarkColorsRepository } from '@/repositories/sites-dark-colors/find-all-sites-dark-colors';

@QueryHandler(FindAllSitesDarkColorsQuery)
export class FindAllSitesDarkColorsQueryHandler
  implements IQueryHandler<FindAllSitesDarkColorsQuery>
{
  constructor(
    private readonly findAllSitesDarkColorRepository: FindAllSitesDarkColorsRepository,
    private readonly countSitesDarkColorsRepository: CountSitesDarkColorsRepository
  ) {}

  async execute(
    query: FindAllSitesDarkColorsQuery
  ): Promise<IPaginatedType<SitesDarkColorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const sitesDarkColors = await this.findAllSitesDarkColorRepository.execute(
      data
    );
    const totalCount = await this.countSitesDarkColorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<SitesDarkColorModel>().toPaginationList({
      items: sitesDarkColors,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllSitesDarkColorsQuery
  ): FindAllSitesDarkColorsQuery {
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
