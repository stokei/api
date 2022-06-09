import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomsMaterialsDTO } from '@/dtos/classrooms-materials/find-all-classrooms-materials.dto';
import { ClassroomsMaterialMapper } from '@/mappers/classrooms-materials';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';

@Injectable()
export class FindAllClassroomsMaterialsRepository
  implements
    IBaseRepository<
      FindAllClassroomsMaterialsDTO,
      Promise<ClassroomsMaterialModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomsMaterialsDTO
  ): Promise<ClassroomsMaterialModel[]> {
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
    return new ClassroomsMaterialMapper().toModels(
      await this.model.classroomsMaterial.findMany({
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
