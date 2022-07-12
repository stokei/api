import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  IWhere,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountClassroomModulesDTO } from '@/dtos/classroom-modules/count-classroom-modules.dto';

@Injectable()
export class CountClassroomModulesRepository
  implements IBaseRepository<CountClassroomModulesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountClassroomModulesDTO): Promise<number> {
    const prismaMapper = new PrismaMapper();
    const mapFromDTOOperatorDataToPrismaOperatorData = (
      operator: IOperator
    ) => {
      const operatorData = where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        id: prismaMapper.toWhereIds(operatorData.ids),
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        parent: prismaMapper.toWhereData(operatorData.parent),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy)
      };
    };
    return await this.model.classroomModule.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}
