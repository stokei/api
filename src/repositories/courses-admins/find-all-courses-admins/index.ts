import { Injectable } from '@nestjs/common';
import {
  cleanObject,
  IBaseRepository,
  IOperator,
  PrismaMapper
} from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCoursesAdminsDTO } from '@/dtos/courses-admins/find-all-courses-admins.dto';
import { CoursesAdminMapper } from '@/mappers/courses-admins';
import { CoursesAdminModel } from '@/models/courses-admin.model';

@Injectable()
export class FindAllCoursesAdminsRepository
  implements
    IBaseRepository<FindAllCoursesAdminsDTO, Promise<CoursesAdminModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCoursesAdminsDTO): Promise<CoursesAdminModel[]> {
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
    return new CoursesAdminMapper().toModels(
      await this.model.coursesAdmin.findMany({
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
