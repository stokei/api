import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllVideosSubtitlesDTO } from '@/dtos/videos-subtitles/find-all-videos-subtitles.dto';
import { VideosSubtitleMapper } from '@/mappers/videos-subtitles';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';

@Injectable()
export class FindAllVideosSubtitlesRepository
  implements
    IBaseRepository<FindAllVideosSubtitlesDTO, Promise<VideosSubtitleModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllVideosSubtitlesDTO
  ): Promise<VideosSubtitleModel[]> {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = data?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        parent: prismaMapper.toWhereData(operatorData.parent)
      };
    };
    return new VideosSubtitleMapper().toModels(
      await this.model.videosSubtitle.findMany({
        where: prismaMapper.toWhere({
          AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
          OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
          NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
        }),
        orderBy,
        ...prismaMapper.toPagination({ page: data?.page })
      })
    );
  }
}
