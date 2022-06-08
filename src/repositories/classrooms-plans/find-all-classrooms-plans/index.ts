import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomsPlansDTO } from '@/dtos/classrooms-plans/find-all-classrooms-plans.dto';
import { ClassroomsPlanMapper } from '@/mappers/classrooms-plans';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

@Injectable()
export class FindAllClassroomsPlansRepository
  implements
    IBaseRepository<FindAllClassroomsPlansDTO, Promise<ClassroomsPlanModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomsPlansDTO
  ): Promise<ClassroomsPlanModel[]> {
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
    return new ClassroomsPlanMapper().toModels(
      await this.model.classroomsPlan.findMany({
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
