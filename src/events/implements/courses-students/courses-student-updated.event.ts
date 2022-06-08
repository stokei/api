import { CoursesStudentModel } from '@/models/courses-student.model';

interface IDataCoursesStudentUpdatedEvent {
  readonly coursesStudent: CoursesStudentModel;
}

export class CoursesStudentUpdatedEvent {
  readonly coursesStudent: CoursesStudentModel;

  constructor(data: IDataCoursesStudentUpdatedEvent) {
    this.coursesStudent = data.coursesStudent;
  }
}
