import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomsInstructorsDTO } from '@/dtos/classrooms-instructors/find-all-classrooms-instructors.dto';
import { ClassroomsInstructorMapper } from '@/mappers/classrooms-instructors';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

@Injectable()
export class FindAllClassroomsInstructorsRepository
  implements
    IBaseRepository<
      FindAllClassroomsInstructorsDTO,
      Promise<ClassroomsInstructorModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomsInstructorsDTO
  ): Promise<ClassroomsInstructorModel[]> {
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
    return new ClassroomsInstructorMapper().toModels(
      await this.model.classroomsInstructor.findMany({
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
