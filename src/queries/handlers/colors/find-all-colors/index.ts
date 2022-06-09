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
import { ColorModel } from '@/models/color.model';
import { FindAllColorsQuery } from '@/queries/implements/colors/find-all-colors.query';
import { CountColorsRepository } from '@/repositories/colors/count-colors';
import { FindAllColorsRepository } from '@/repositories/colors/find-all-colors';

@QueryHandler(FindAllColorsQuery)
export class FindAllColorsQueryHandler
  implements IQueryHandler<FindAllColorsQuery>
{
  constructor(
    private readonly findAllColorRepository: FindAllColorsRepository,
    private readonly countColorsRepository: CountColorsRepository
  ) {}

  async execute(
    query: FindAllColorsQuery
  ): Promise<IPaginatedType<ColorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const colors = await this.findAllColorRepository.execute(data);
    const totalCount = await this.countColorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ColorModel>().toPaginationList({
      items: colors,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllColorsQuery): FindAllColorsQuery {
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
