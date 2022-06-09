import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllModulesVideosDTO } from '@/dtos/modules-videos/find-all-modules-videos.dto';
import { ModulesVideoMapper } from '@/mappers/modules-videos';
import { ModulesVideoModel } from '@/models/modules-video.model';

@Injectable()
export class FindAllModulesVideosRepository
  implements
    IBaseRepository<FindAllModulesVideosDTO, Promise<ModulesVideoModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllModulesVideosDTO): Promise<ModulesVideoModel[]> {
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
    return new ModulesVideoMapper().toModels(
      await this.model.modulesVideo.findMany({
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
