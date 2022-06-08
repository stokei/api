import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { CountProjectsPlansDTO } from '@/dtos/projects-plans/count-projects-plans.dto';
import {
  IBaseRepository,
  PrismaMapper,
  IOperator,
  IWhere
} from '@stokei/nestjs';

@Injectable()
export class CountProjectsPlansRepository
  implements IBaseRepository<CountProjectsPlansDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountProjectsPlansDTO): Promise<number> {
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
        parent: prismaMapper.toWhereData(operatorData.parent)
      };
    };
    return await this.model.projectsPlan.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}
