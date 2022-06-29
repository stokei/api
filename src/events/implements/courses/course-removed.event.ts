import { CourseModel } from '@/models/course.model';

interface IDataCourseRemovedEvent {
  readonly removedBy: string;
  readonly course: CourseModel;
}

export class CourseRemovedEvent {
  readonly removedBy: string;
  readonly course: CourseModel;

  constructor(data: IDataCourseRemovedEvent) {
    this.removedBy = data.removedBy;
    this.course = data.course;
  }
}
