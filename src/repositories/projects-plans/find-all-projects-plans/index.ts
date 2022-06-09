import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllProjectsPlansDTO } from '@/dtos/projects-plans/find-all-projects-plans.dto';
import { ProjectsPlanMapper } from '@/mappers/projects-plans';
import { ProjectsPlanModel } from '@/models/projects-plan.model';

@Injectable()
export class FindAllProjectsPlansRepository
  implements
    IBaseRepository<FindAllProjectsPlansDTO, Promise<ProjectsPlanModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllProjectsPlansDTO): Promise<ProjectsPlanModel[]> {
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
    return new ProjectsPlanMapper().toModels(
      await this.model.projectsPlan.findMany({
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
