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
import { CardModel } from '@/models/card.model';
import { FindAllCardsQuery } from '@/queries/implements/cards/find-all-cards.query';
import { CountCardsRepository } from '@/repositories/cards/count-cards';
import { FindAllCardsRepository } from '@/repositories/cards/find-all-cards';

@QueryHandler(FindAllCardsQuery)
export class FindAllCardsQueryHandler
  implements IQueryHandler<FindAllCardsQuery>
{
  constructor(
    private readonly findAllCardRepository: FindAllCardsRepository,
    private readonly countCardsRepository: CountCardsRepository
  ) {}

  async execute(query: FindAllCardsQuery): Promise<IPaginatedType<CardModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const cards = await this.findAllCardRepository.execute(data);
    const totalCount = await this.countCardsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CardModel>().toPaginationList({
      items: cards,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllCardsQuery): FindAllCardsQuery {
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
