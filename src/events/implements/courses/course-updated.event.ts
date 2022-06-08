import { CourseModel } from '@/models/course.model';

interface IDataCourseUpdatedEvent {
  readonly course: CourseModel;
}

export class CourseUpdatedEvent {
  readonly course: CourseModel;

  constructor(data: IDataCourseUpdatedEvent) {
    this.course = data.course;
  }
}
