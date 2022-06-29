import { CourseModel } from '@/models/course.model';

interface IDataCourseUpdatedEvent {
  readonly updatedBy: string;
  readonly course: CourseModel;
}

export class CourseUpdatedEvent {
  readonly updatedBy: string;
  readonly course: CourseModel;

  constructor(data: IDataCourseUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.course = data.course;
  }
}
