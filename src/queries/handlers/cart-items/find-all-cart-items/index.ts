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
import { CartItemModel } from '@/models/cart-item.model';
import { FindAllCartItemsQuery } from '@/queries/implements/cart-items/find-all-cart-items.query';
import { CountCartItemsRepository } from '@/repositories/cart-items/count-cart-items';
import { FindAllCartItemsRepository } from '@/repositories/cart-items/find-all-cart-items';

@QueryHandler(FindAllCartItemsQuery)
export class FindAllCartItemsQueryHandler
  implements IQueryHandler<FindAllCartItemsQuery>
{
  constructor(
    private readonly findAllCartItemRepository: FindAllCartItemsRepository,
    private readonly countCartItemsRepository: CountCartItemsRepository
  ) {}

  async execute(
    query: FindAllCartItemsQuery
  ): Promise<IPaginatedType<CartItemModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const cartItems = await this.findAllCartItemRepository.execute(data);
    const totalCount = await this.countCartItemsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CartItemModel>().toPaginationList({
      items: cartItems,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllCartItemsQuery): FindAllCartItemsQuery {
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
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
