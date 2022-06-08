import { CourseModel } from '@/models/course.model';

interface IDataCourseRemovedEvent {
  readonly course: CourseModel;
}

export class CourseRemovedEvent {
  readonly course: CourseModel;

  constructor(data: IDataCourseRemovedEvent) {
    this.course = data.course;
  }
}
