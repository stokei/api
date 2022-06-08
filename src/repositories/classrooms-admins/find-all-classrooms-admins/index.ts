import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomsAdminsDTO } from '@/dtos/classrooms-admins/find-all-classrooms-admins.dto';
import { ClassroomsAdminMapper } from '@/mappers/classrooms-admins';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

@Injectable()
export class FindAllClassroomsAdminsRepository
  implements
    IBaseRepository<
      FindAllClassroomsAdminsDTO,
      Promise<ClassroomsAdminModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomsAdminsDTO
  ): Promise<ClassroomsAdminModel[]> {
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
    return new ClassroomsAdminMapper().toModels(
      await this.model.classroomsAdmin.findMany({
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
