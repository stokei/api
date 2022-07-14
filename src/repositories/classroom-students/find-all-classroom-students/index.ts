import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomStudentsDTO } from '@/dtos/classroom-students/find-all-classroom-students.dto';
import { ClassroomStudentMapper } from '@/mappers/classroom-students';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Injectable()
export class FindAllClassroomStudentsRepository
  implements
    IBaseRepository<
      FindAllClassroomStudentsDTO,
      Promise<ClassroomStudentModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomStudentsDTO
  ): Promise<ClassroomStudentModel[]> {
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
        student: prismaMapper.toWhereData(operatorData.student),
        classroom: prismaMapper.toWhereData(operatorData.classroom),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return new ClassroomStudentMapper().toModels(
      await this.model.classroomStudent.findMany({
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
