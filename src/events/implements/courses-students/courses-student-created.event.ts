import { CoursesStudentModel } from '@/models/courses-student.model';

interface IDataCoursesStudentCreatedEvent {
  readonly coursesStudent: CoursesStudentModel;
}

export class CoursesStudentCreatedEvent {
  readonly coursesStudent: CoursesStudentModel;

  constructor(data: IDataCoursesStudentCreatedEvent) {
    this.coursesStudent = data.coursesStudent;
  }
}
