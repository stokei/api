import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  splitServiceId
} from '@stokei/nestjs';

import { ClassroomInstructorEntity } from '@/entities';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';
import { FindAllClassroomInstructorsQuery } from '@/queries/implements/classroom-instructors/find-all-classroom-instructors.query';

export class ClassroomInstructorMapper {
  toFindAllQueryClean(
    query: FindAllClassroomInstructorsQuery
  ): FindAllClassroomInstructorsQuery {
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
          instructor: cleanWhereDataString(operatorData.instructor),
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
  toModel(classroomInstructor: ClassroomInstructorEntity) {
    return (
      classroomInstructor &&
      new ClassroomInstructorModel({
        ...classroomInstructor,
        updatedAt: convertToISODateString(classroomInstructor.updatedAt),
        createdAt: convertToISODateString(classroomInstructor.createdAt)
      })
    );
  }
  toModels(classroomInstructors: ClassroomInstructorEntity[]) {
    return classroomInstructors?.length > 0
      ? classroomInstructors.map(this.toModel).filter(Boolean)
      : [];
  }
}
