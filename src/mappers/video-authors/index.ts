import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataString,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllVideoAuthorsDTO,
  WhereDataFindAllVideoAuthorsDTO
} from '@/dtos/video-authors/find-all-video-authors.dto';
import { VideoAuthorEntity } from '@/entities';
import { VideoAuthorModel } from '@/models/video-author.model';
import { FindAllVideoAuthorsQuery } from '@/queries/implements/video-authors/find-all-video-authors.query';

export class VideoAuthorMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllVideoAuthorsDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          video: prismaMapper.toWhereData(operatorData.video),
          author: prismaMapper.toWhereData(operatorData.author),
          app: prismaMapper.toWhereData(operatorData.app),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllVideoAuthorsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(
    query: FindAllVideoAuthorsQuery
  ): FindAllVideoAuthorsQuery {
    if (!query) {
      return null;
    }
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        allowIsEmptyValues: {
          NOT: true
        },
        operatorMapper(operatorData) {
          return {
            video: cleanWhereDataString(operatorData.video),
            author: cleanWhereDataString(operatorData.author),
            app: cleanWhereDataString(operatorData.app),
            updatedBy: cleanWhereDataString(operatorData.updatedBy),
            createdBy: cleanWhereDataString(operatorData.createdBy),
            ids:
              operatorData.ids?.length > 0
                ? operatorData.ids.map(
                    (id) => splitServiceId(cleanValue(id))?.id
                  )
                : undefined
          };
        }
      }),
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(videoAuthor: VideoAuthorEntity) {
    return videoAuthor && new VideoAuthorModel(videoAuthor);
  }
  toModels(videoAuthors: VideoAuthorEntity[]) {
    return videoAuthors?.length > 0
      ? videoAuthors.map(this.toModel).filter(Boolean)
      : [];
  }
}
