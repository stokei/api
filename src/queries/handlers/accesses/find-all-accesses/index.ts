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
import { AccessModel } from '@/models/access.model';
import { FindAllAccessesQuery } from '@/queries/implements/accesses/find-all-accesses.query';
import { CountAccessesRepository } from '@/repositories/accesses/count-accesses';
import { FindAllAccessesRepository } from '@/repositories/accesses/find-all-accesses';

@QueryHandler(FindAllAccessesQuery)
export class FindAllAccessesQueryHandler
  implements IQueryHandler<FindAllAccessesQuery>
{
  constructor(
    private readonly findAllAccessRepository: FindAllAccessesRepository,
    private readonly countAccessesRepository: CountAccessesRepository
  ) {}

  async execute(
    query: FindAllAccessesQuery
  ): Promise<IPaginatedType<AccessModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const accesses = await this.findAllAccessRepository.execute(data);
    const totalCount = await this.countAccessesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<AccessModel>().toPaginationList({
      items: accesses,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllAccessesQuery): FindAllAccessesQuery {
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
