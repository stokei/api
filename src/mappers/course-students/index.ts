import { convertToISODateString } from '@stokei/nestjs';

import { CourseStudentEntity } from '@/entities';
import { CourseStudentModel } from '@/models/course-student.model';

export class CourseStudentMapper {
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
