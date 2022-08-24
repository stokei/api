import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataBoolean,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllClassroomsDTO,
  WhereDataFindAllClassroomsDTO
} from '@/dtos/classrooms/find-all-classrooms.dto';
import { ClassroomEntity } from '@/entities';
import { ClassroomModel } from '@/models/classroom.model';
import { FindAllClassroomsQuery } from '@/queries/implements/classrooms/find-all-classrooms.query';

export class ClassroomMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllClassroomsDTO>) {
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
        app: prismaMapper.toWhereData(operatorData.app),
        parent: prismaMapper.toWhereData(operatorData.parent),
        name: prismaMapper.toWhereDataSearch(operatorData.name),
        description: prismaMapper.toWhereDataSearch(operatorData.description),
        hasAccessToAllModules: prismaMapper.toWhereData(
          operatorData.hasAccessToAllModules
        ),
        updatedBy: prismaMapper.toWhereData(operatorData.updatedBy),
        createdBy: prismaMapper.toWhereData(operatorData.createdBy)
      };
    };
    return prismaMapper.toWhere({
      AND: mapFromDTOOperatorDataToPrismaOperatorData('AND'),
      OR: mapFromDTOOperatorDataToPrismaOperatorData('OR'),
      NOT: mapFromDTOOperatorDataToPrismaOperatorData('NOT')
    });
  }
  toFindAllPrisma(data: FindAllClassroomsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(query: FindAllClassroomsQuery): FindAllClassroomsQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataString(operatorData.parent),
          app: cleanWhereDataString(operatorData.app),
          name: cleanWhereDataSearch(operatorData.name),
          description: cleanWhereDataSearch(operatorData.description),
          hasAccessToAllModules: cleanWhereDataBoolean(
            operatorData.hasAccessToAllModules
          ),
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(classroom: ClassroomEntity) {
    return classroom && new ClassroomModel(classroom);
  }
  toModels(classrooms: ClassroomEntity[]) {
    return classrooms?.length > 0
      ? classrooms.map(this.toModel).filter(Boolean)
      : [];
  }
}
