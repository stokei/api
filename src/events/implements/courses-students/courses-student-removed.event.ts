import { CoursesStudentModel } from '@/models/courses-student.model';

interface IDataCoursesStudentRemovedEvent {
  readonly coursesStudent: CoursesStudentModel;
}

export class CoursesStudentRemovedEvent {
  readonly coursesStudent: CoursesStudentModel;

  constructor(data: IDataCoursesStudentRemovedEvent) {
    this.coursesStudent = data.coursesStudent;
  }
}
