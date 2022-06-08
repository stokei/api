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
import { RatingModel } from '@/models/rating.model';
import { FindAllRatingsQuery } from '@/queries/implements/ratings/find-all-ratings.query';
import { CountRatingsRepository } from '@/repositories/ratings/count-ratings';
import { FindAllRatingsRepository } from '@/repositories/ratings/find-all-ratings';

@QueryHandler(FindAllRatingsQuery)
export class FindAllRatingsQueryHandler
  implements IQueryHandler<FindAllRatingsQuery>
{
  constructor(
    private readonly findAllRatingRepository: FindAllRatingsRepository,
    private readonly countRatingsRepository: CountRatingsRepository
  ) {}

  async execute(
    query: FindAllRatingsQuery
  ): Promise<IPaginatedType<RatingModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const ratings = await this.findAllRatingRepository.execute(data);
    const totalCount = await this.countRatingsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<RatingModel>().toPaginationList({
      items: ratings,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllRatingsQuery): FindAllRatingsQuery {
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
