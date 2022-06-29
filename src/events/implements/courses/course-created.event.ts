import { CourseModel } from '@/models/course.model';

interface IDataCourseCreatedEvent {
  readonly createdBy: string;
  readonly course: CourseModel;
}

export class CourseCreatedEvent {
  readonly createdBy: string;
  readonly course: CourseModel;

  constructor(data: IDataCourseCreatedEvent) {
    this.createdBy = data.createdBy;
    this.course = data.course;
  }
}
