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
import { CartModel } from '@/models/cart.model';
import { FindAllCartsQuery } from '@/queries/implements/carts/find-all-carts.query';
import { CountCartsRepository } from '@/repositories/carts/count-carts';
import { FindAllCartsRepository } from '@/repositories/carts/find-all-carts';

@QueryHandler(FindAllCartsQuery)
export class FindAllCartsQueryHandler
  implements IQueryHandler<FindAllCartsQuery>
{
  constructor(
    private readonly findAllCartRepository: FindAllCartsRepository,
    private readonly countCartsRepository: CountCartsRepository
  ) {}

  async execute(query: FindAllCartsQuery): Promise<IPaginatedType<CartModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const carts = await this.findAllCartRepository.execute(data);
    const totalCount = await this.countCartsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CartModel>().toPaginationList({
      items: carts,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllCartsQuery): FindAllCartsQuery {
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
