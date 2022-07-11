import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomInstructorsDTO } from '@/dtos/classroom-instructors/find-all-classroom-instructors.dto';
import { ClassroomInstructorMapper } from '@/mappers/classroom-instructors';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Injectable()
export class FindAllClassroomInstructorsRepository
  implements
    IBaseRepository<
      FindAllClassroomInstructorsDTO,
      Promise<ClassroomInstructorModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomInstructorsDTO
  ): Promise<ClassroomInstructorModel[]> {
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
        parent: prismaMapper.toWhereData(operatorData.parent),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy)
      };
    };
    return new ClassroomInstructorMapper().toModels(
      await this.model.classroomInstructor.findMany({
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
