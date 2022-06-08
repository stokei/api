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
import { PriceModel } from '@/models/price.model';
import { FindAllPricesQuery } from '@/queries/implements/prices/find-all-prices.query';
import { CountPricesRepository } from '@/repositories/prices/count-prices';
import { FindAllPricesRepository } from '@/repositories/prices/find-all-prices';

@QueryHandler(FindAllPricesQuery)
export class FindAllPricesQueryHandler
  implements IQueryHandler<FindAllPricesQuery>
{
  constructor(
    private readonly findAllPriceRepository: FindAllPricesRepository,
    private readonly countPricesRepository: CountPricesRepository
  ) {}

  async execute(
    query: FindAllPricesQuery
  ): Promise<IPaginatedType<PriceModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const prices = await this.findAllPriceRepository.execute(data);
    const totalCount = await this.countPricesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PriceModel>().toPaginationList({
      items: prices,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllPricesQuery): FindAllPricesQuery {
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
