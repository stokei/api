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
import { CheckoutModel } from '@/models/checkout.model';
import { FindAllCheckoutsQuery } from '@/queries/implements/checkouts/find-all-checkouts.query';
import { CountCheckoutsRepository } from '@/repositories/checkouts/count-checkouts';
import { FindAllCheckoutsRepository } from '@/repositories/checkouts/find-all-checkouts';

@QueryHandler(FindAllCheckoutsQuery)
export class FindAllCheckoutsQueryHandler
  implements IQueryHandler<FindAllCheckoutsQuery>
{
  constructor(
    private readonly findAllCheckoutRepository: FindAllCheckoutsRepository,
    private readonly countCheckoutsRepository: CountCheckoutsRepository
  ) {}

  async execute(
    query: FindAllCheckoutsQuery
  ): Promise<IPaginatedType<CheckoutModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const checkouts = await this.findAllCheckoutRepository.execute(data);
    const totalCount = await this.countCheckoutsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CheckoutModel>().toPaginationList({
      items: checkouts,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllCheckoutsQuery): FindAllCheckoutsQuery {
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
