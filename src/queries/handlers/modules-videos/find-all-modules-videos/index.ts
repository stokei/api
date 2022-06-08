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
import { ModulesVideoModel } from '@/models/modules-video.model';
import { FindAllModulesVideosQuery } from '@/queries/implements/modules-videos/find-all-modules-videos.query';
import { CountModulesVideosRepository } from '@/repositories/modules-videos/count-modules-videos';
import { FindAllModulesVideosRepository } from '@/repositories/modules-videos/find-all-modules-videos';

@QueryHandler(FindAllModulesVideosQuery)
export class FindAllModulesVideosQueryHandler
  implements IQueryHandler<FindAllModulesVideosQuery>
{
  constructor(
    private readonly findAllModulesVideoRepository: FindAllModulesVideosRepository,
    private readonly countModulesVideosRepository: CountModulesVideosRepository
  ) {}

  async execute(
    query: FindAllModulesVideosQuery
  ): Promise<IPaginatedType<ModulesVideoModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const modulesVideos = await this.findAllModulesVideoRepository.execute(
      data
    );
    const totalCount = await this.countModulesVideosRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ModulesVideoModel>().toPaginationList({
      items: modulesVideos,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllModulesVideosQuery
  ): FindAllModulesVideosQuery {
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
