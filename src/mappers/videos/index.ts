import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhere,
  cleanWhereDataBoolean,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllVideosDTO,
  WhereDataFindAllVideosDTO
} from '@/dtos/videos/find-all-videos.dto';
import { VideoEntity } from '@/entities';
import { VideoModel } from '@/models/video.model';
import { FindAllVideosQuery } from '@/queries/implements/videos/find-all-videos.query';

export class VideoMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllVideosDTO>) {
    const prismaMapper = new PrismaMapper();
    return prismaMapper.toWhere({
      data: where,
      allowIsEmptyValues: {
        NOT: true
      },
      operatorMapper(operatorData) {
        return {
          id: prismaMapper.toWhereIds(operatorData.ids),
          name: prismaMapper.toWhereDataSearch(operatorData.name),
          parent: prismaMapper.toWhereDataSearch(operatorData.parent),
          app: prismaMapper.toWhereData(operatorData.app),
          file: prismaMapper.toWhereData(operatorData.file),
          slug: prismaMapper.toWhereData(operatorData.slug),
          description: prismaMapper.toWhereDataSearch(operatorData.description),
          active: prismaMapper.toWhereData(operatorData.active),
          private: prismaMapper.toWhereData(operatorData.private),
          updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
          createdBy: prismaMapper.toWhereData(operatorData.createdBy)
        };
      }
    });
  }
  toFindAllPrisma(data: FindAllVideosDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllVideosQuery): FindAllVideosQuery {
    if (!query) {
      return null;
    }
    return {
      ...query,
      where: cleanWhere({
        data: query?.where,
        operatorMapper(operatorData) {
          return {
            parent: cleanWhereDataSearch(operatorData.parent),
            slug: cleanWhereDataString(operatorData.slug),
            file: cleanWhereDataString(operatorData.file),
            description: cleanWhereDataSearch(operatorData.description),
            active: cleanWhereDataBoolean(operatorData.active),
            private: cleanWhereDataBoolean(operatorData.private),
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
        name: cleanSortValue(query.orderBy?.name),
        slug: cleanSortValue(query.orderBy?.slug),
        active: cleanSortValue(query.orderBy?.active),
        private: cleanSortValue(query.orderBy?.private),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(video: VideoEntity) {
    return video && new VideoModel(video);
  }
  toModels(videos: VideoEntity[]) {
    return videos?.length > 0 ? videos.map(this.toModel).filter(Boolean) : [];
  }
}
