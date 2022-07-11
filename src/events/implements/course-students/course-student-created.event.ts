import { CourseStudentModel } from '@/models/course-student.model';

interface IDataCourseStudentCreatedEvent {
  readonly createdBy: string;
  readonly courseStudent: CourseStudentModel;
}

export class CourseStudentCreatedEvent {
  readonly createdBy: string;
  readonly courseStudent: CourseStudentModel;

  constructor(data: IDataCourseStudentCreatedEvent) {
    this.createdBy = data.createdBy;
    this.courseStudent = data.courseStudent;
  }
}
