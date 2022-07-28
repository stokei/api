import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  IWhere,
  PrismaMapper,
  splitServiceId
} from '@stokei/nestjs';

import {
  FindAllClassroomStudentsDTO,
  WhereDataFindAllClassroomStudentsDTO
} from '@/dtos/classroom-students/find-all-classroom-students.dto';
import { ClassroomStudentEntity } from '@/entities';
import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindAllClassroomStudentsQuery } from '@/queries/implements/classroom-students/find-all-classroom-students.query';

export class ClassroomStudentMapper {
  toWhereFindAllPrisma(where: IWhere<WhereDataFindAllClassroomStudentsDTO>) {
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
        classroom: prismaMapper.toWhereData(operatorData.classroom),
        student: prismaMapper.toWhereData(operatorData.student),
        app: prismaMapper.toWhereData(operatorData.app),
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
  toFindAllPrisma(data: FindAllClassroomStudentsDTO) {
    const prismaMapper = new PrismaMapper();
    const orderBy = prismaMapper.toOrderBy(cleanObject(data?.orderBy));
    return {
      where: this.toWhereFindAllPrisma(data?.where),
      orderBy,
      ...prismaMapper.toPagination({ page: data?.page })
    };
  }
  toFindAllQueryClean(
    query: FindAllClassroomStudentsQuery
  ): FindAllClassroomStudentsQuery {
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
          classroom: cleanWhereDataString(operatorData.classroom),
          student: cleanWhereDataSearch(operatorData.student),
          app: cleanWhereDataString(operatorData.app),
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
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
  toModel(classroomStudent: ClassroomStudentEntity) {
    return (
      classroomStudent &&
      new ClassroomStudentModel({
        ...classroomStudent,
        updatedAt: convertToISODateString(classroomStudent.updatedAt),
        createdAt: convertToISODateString(classroomStudent.createdAt)
      })
    );
  }
  toModels(classroomStudents: ClassroomStudentEntity[]) {
    return classroomStudents?.length > 0
      ? classroomStudents.map(this.toModel).filter(Boolean)
      : [];
  }
}
