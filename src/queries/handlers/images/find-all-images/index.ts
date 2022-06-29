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
import { ImageModel } from '@/models/image.model';
import { FindAllImagesQuery } from '@/queries/implements/images/find-all-images.query';
import { CountImagesRepository } from '@/repositories/images/count-images';
import { FindAllImagesRepository } from '@/repositories/images/find-all-images';

@QueryHandler(FindAllImagesQuery)
export class FindAllImagesQueryHandler
  implements IQueryHandler<FindAllImagesQuery>
{
  constructor(
    private readonly findAllImageRepository: FindAllImagesRepository,
    private readonly countImagesRepository: CountImagesRepository
  ) {}

  async execute(
    query: FindAllImagesQuery
  ): Promise<IPaginatedType<ImageModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const images = await this.findAllImageRepository.execute(data);
    const totalCount = await this.countImagesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ImageModel>().toPaginationList({
      items: images,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllImagesQuery): FindAllImagesQuery {
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
