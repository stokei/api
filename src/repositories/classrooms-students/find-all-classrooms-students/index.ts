import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomsStudentsDTO } from '@/dtos/classrooms-students/find-all-classrooms-students.dto';
import { ClassroomsStudentMapper } from '@/mappers/classrooms-students';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

@Injectable()
export class FindAllClassroomsStudentsRepository
  implements
    IBaseRepository<
      FindAllClassroomsStudentsDTO,
      Promise<ClassroomsStudentModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomsStudentsDTO
  ): Promise<ClassroomsStudentModel[]> {
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
    return new ClassroomsStudentMapper().toModels(
      await this.model.classroomsStudent.findMany({
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
