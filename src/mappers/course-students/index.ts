import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  convertToISODateString,
  IOperator,
  splitServiceId
} from '@stokei/nestjs';

import { CourseStudentEntity } from '@/entities';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindAllCourseStudentsQuery } from '@/queries/implements/course-students/find-all-course-students.query';

export class CourseStudentMapper {
  toFindAllQueryClean(
    query: FindAllCourseStudentsQuery
  ): FindAllCourseStudentsQuery {
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
          course: cleanWhereDataString(operatorData.course),
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
  toModel(courseStudent: CourseStudentEntity) {
    return (
      courseStudent &&
      new CourseStudentModel({
        ...courseStudent,
        updatedAt: convertToISODateString(courseStudent.updatedAt),
        createdAt: convertToISODateString(courseStudent.createdAt)
      })
    );
  }
  toModels(courseStudents: CourseStudentEntity[]) {
    return courseStudents?.length > 0
      ? courseStudents.map(this.toModel).filter(Boolean)
      : [];
  }
}
