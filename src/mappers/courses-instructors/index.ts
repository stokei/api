import { convertToISODateString } from '@stokei/nestjs';
import { CoursesInstructorEntity } from '@/entities';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';

export class CoursesInstructorMapper {
  toModel(coursesInstructor: CoursesInstructorEntity) {
    return (
      coursesInstructor &&
      new CoursesInstructorModel({
        ...coursesInstructor,
        updatedAt: convertToISODateString(coursesInstructor.updatedAt),
        createdAt: convertToISODateString(coursesInstructor.createdAt)
      })
    );
  }
  toModels(coursesInstructors: CoursesInstructorEntity[]) {
    return coursesInstructors?.length > 0
      ? coursesInstructors.map(this.toModel).filter(Boolean)
      : [];
  }
}
