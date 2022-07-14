import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomModulesDTO } from '@/dtos/classroom-modules/find-all-classroom-modules.dto';
import { ClassroomModuleMapper } from '@/mappers/classroom-modules';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

@Injectable()
export class FindAllClassroomModulesRepository
  implements
    IBaseRepository<
      FindAllClassroomModulesDTO,
      Promise<ClassroomModuleModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomModulesDTO
  ): Promise<ClassroomModuleModel[]> {
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
        classroom: prismaMapper.toWhereData(operatorData.classroom),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return new ClassroomModuleMapper().toModels(
      await this.model.classroomModule.findMany({
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
