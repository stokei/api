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
import { ModuleVideoModel } from '@/models/module-video.model';
import { FindAllModuleVideosQuery } from '@/queries/implements/module-videos/find-all-module-videos.query';
import { CountModuleVideosRepository } from '@/repositories/module-videos/count-module-videos';
import { FindAllModuleVideosRepository } from '@/repositories/module-videos/find-all-module-videos';

@QueryHandler(FindAllModuleVideosQuery)
export class FindAllModuleVideosQueryHandler
  implements IQueryHandler<FindAllModuleVideosQuery>
{
  constructor(
    private readonly findAllModuleVideoRepository: FindAllModuleVideosRepository,
    private readonly countModuleVideosRepository: CountModuleVideosRepository
  ) {}

  async execute(
    query: FindAllModuleVideosQuery
  ): Promise<IPaginatedType<ModuleVideoModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const moduleVideos = await this.findAllModuleVideoRepository.execute(data);
    const totalCount = await this.countModuleVideosRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ModuleVideoModel>().toPaginationList({
      items: moduleVideos,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllModuleVideosQuery): FindAllModuleVideosQuery {
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
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
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
