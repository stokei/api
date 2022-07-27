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

import { CourseInstructorEntity } from '@/entities';
import { CourseInstructorModel } from '@/models/course-instructor.model';
import { FindAllCourseInstructorsQuery } from '@/queries/implements/course-instructors/find-all-course-instructors.query';

export class CourseInstructorMapper {
  toFindAllQueryClean(
    query: FindAllCourseInstructorsQuery
  ): FindAllCourseInstructorsQuery {
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
          instructor: cleanWhereDataSearch(operatorData.instructor),
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
  toModel(courseInstructor: CourseInstructorEntity) {
    return (
      courseInstructor &&
      new CourseInstructorModel({
        ...courseInstructor,
        updatedAt: convertToISODateString(courseInstructor.updatedAt),
        createdAt: convertToISODateString(courseInstructor.createdAt)
      })
    );
  }
  toModels(courseInstructors: CourseInstructorEntity[]) {
    return courseInstructors?.length > 0
      ? courseInstructors.map(this.toModel).filter(Boolean)
      : [];
  }
}
