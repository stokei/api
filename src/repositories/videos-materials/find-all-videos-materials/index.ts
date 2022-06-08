import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllVideosMaterialsDTO } from '@/dtos/videos-materials/find-all-videos-materials.dto';
import { VideosMaterialMapper } from '@/mappers/videos-materials';
import { VideosMaterialModel } from '@/models/videos-material.model';

@Injectable()
export class FindAllVideosMaterialsRepository
  implements
    IBaseRepository<FindAllVideosMaterialsDTO, Promise<VideosMaterialModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllVideosMaterialsDTO
  ): Promise<VideosMaterialModel[]> {
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
    return new VideosMaterialMapper().toModels(
      await this.model.videosMaterial.findMany({
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
