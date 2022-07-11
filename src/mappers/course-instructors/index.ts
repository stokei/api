import { convertToISODateString } from '@stokei/nestjs';

import { CourseInstructorEntity } from '@/entities';
import { CourseInstructorModel } from '@/models/course-instructor.model';

export class CourseInstructorMapper {
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
