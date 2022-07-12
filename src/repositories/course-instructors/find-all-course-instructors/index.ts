import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCourseInstructorsDTO } from '@/dtos/course-instructors/find-all-course-instructors.dto';
import { CourseInstructorMapper } from '@/mappers/course-instructors';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Injectable()
export class FindAllCourseInstructorsRepository
  implements
    IBaseRepository<
      FindAllCourseInstructorsDTO,
      Promise<CourseInstructorModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllCourseInstructorsDTO
  ): Promise<CourseInstructorModel[]> {
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
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy)
      };
    };
    return new CourseInstructorMapper().toModels(
      await this.model.courseInstructor.findMany({
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
