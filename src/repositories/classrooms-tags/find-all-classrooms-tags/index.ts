import { Injectable } from '@nestjs/common';
import {
  IBaseRepository,
  IOperator,
  PrismaMapper,
  cleanObject
} from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomsTagsDTO } from '@/dtos/classrooms-tags/find-all-classrooms-tags.dto';
import { ClassroomsTagMapper } from '@/mappers/classrooms-tags';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';

@Injectable()
export class FindAllClassroomsTagsRepository
  implements
    IBaseRepository<FindAllClassroomsTagsDTO, Promise<ClassroomsTagModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllClassroomsTagsDTO): Promise<ClassroomsTagModel[]> {
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
    return new ClassroomsTagMapper().toModels(
      await this.model.classroomsTag.findMany({
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
