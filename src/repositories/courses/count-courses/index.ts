import { Injectable } from '@nestjs/common';
import { IBaseRepository, IOperator, PrismaMapper } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCoursesDTO } from '@/dtos/courses/count-courses.dto';

@Injectable()
export class CountCoursesRepository
  implements IBaseRepository<CountCoursesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCoursesDTO): Promise<number> {
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
        parent: prismaMapper.toWhereData(operatorData.parent),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return await this.model.course.count({
      where: prismaMapper.toWhere({
        AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
        OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
        NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
      })
    });
  }
}
