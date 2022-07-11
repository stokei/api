import { CourseStudentModel } from '@/models/course-student.model';

interface IDataCourseStudentRemovedEvent {
  readonly removedBy: string;
  readonly courseStudent: CourseStudentModel;
}

export class CourseStudentRemovedEvent {
  readonly removedBy: string;
  readonly courseStudent: CourseStudentModel;

  constructor(data: IDataCourseStudentRemovedEvent) {
    this.removedBy = data.removedBy;
    this.courseStudent = data.courseStudent;
  }
}
