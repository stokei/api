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
import { FileModel } from '@/models/file.model';
import { FindAllFilesQuery } from '@/queries/implements/files/find-all-files.query';
import { CountFilesRepository } from '@/repositories/files/count-files';
import { FindAllFilesRepository } from '@/repositories/files/find-all-files';

@QueryHandler(FindAllFilesQuery)
export class FindAllFilesQueryHandler
  implements IQueryHandler<FindAllFilesQuery>
{
  constructor(
    private readonly findAllFileRepository: FindAllFilesRepository,
    private readonly countFilesRepository: CountFilesRepository
  ) {}

  async execute(query: FindAllFilesQuery): Promise<IPaginatedType<FileModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const files = await this.findAllFileRepository.execute(data);
    const totalCount = await this.countFilesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<FileModel>().toPaginationList({
      items: files,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllFilesQuery): FindAllFilesQuery {
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
