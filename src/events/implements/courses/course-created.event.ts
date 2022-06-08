import { CourseModel } from '@/models/course.model';

interface IDataCourseCreatedEvent {
  readonly course: CourseModel;
}

export class CourseCreatedEvent {
  readonly course: CourseModel;

  constructor(data: IDataCourseCreatedEvent) {
    this.course = data.course;
  }
}
