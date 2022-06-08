import { convertToISODateString } from '@stokei/nestjs';
import { CourseEntity } from '@/entities';
import { CourseModel } from '@/models/course.model';

export class CourseMapper {
  toModel(course: CourseEntity) {
    return (
      course &&
      new CourseModel({
        ...course,
        updatedAt: convertToISODateString(course.updatedAt),
        createdAt: convertToISODateString(course.createdAt)
      })
    );
  }
  toModels(courses: CourseEntity[]) {
    return courses?.length > 0 ? courses.map(this.toModel).filter(Boolean) : [];
  }
}
