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
import { VideosMaterialModel } from '@/models/videos-material.model';
import { FindAllVideosMaterialsQuery } from '@/queries/implements/videos-materials/find-all-videos-materials.query';
import { CountVideosMaterialsRepository } from '@/repositories/videos-materials/count-videos-materials';
import { FindAllVideosMaterialsRepository } from '@/repositories/videos-materials/find-all-videos-materials';

@QueryHandler(FindAllVideosMaterialsQuery)
export class FindAllVideosMaterialsQueryHandler
  implements IQueryHandler<FindAllVideosMaterialsQuery>
{
  constructor(
    private readonly findAllVideosMaterialRepository: FindAllVideosMaterialsRepository,
    private readonly countVideosMaterialsRepository: CountVideosMaterialsRepository
  ) {}

  async execute(
    query: FindAllVideosMaterialsQuery
  ): Promise<IPaginatedType<VideosMaterialModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const videosMaterials = await this.findAllVideosMaterialRepository.execute(
      data
    );
    const totalCount = await this.countVideosMaterialsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<VideosMaterialModel>().toPaginationList({
      items: videosMaterials,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllVideosMaterialsQuery
  ): FindAllVideosMaterialsQuery {
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
