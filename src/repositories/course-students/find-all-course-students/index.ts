import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCourseStudentsDTO } from '@/dtos/course-students/find-all-course-students.dto';
import { CourseStudentMapper } from '@/mappers/course-students';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class FindAllCourseStudentsRepository
  implements
    IBaseRepository<FindAllCourseStudentsDTO, Promise<CourseStudentModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCourseStudentsDTO): Promise<CourseStudentModel[]> {
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
        course: prismaMapper.toWhereData(operatorData.course),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return new CourseStudentMapper().toModels(
      await this.model.courseStudent.findMany({
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
