import { CoursesStudentModel } from '@/models/courses-student.model';

interface IDataCoursesStudentRemovedEvent {
  readonly removedBy: string;
  readonly coursesStudent: CoursesStudentModel;
}

export class CoursesStudentRemovedEvent {
  readonly removedBy: string;
  readonly coursesStudent: CoursesStudentModel;

  constructor(data: IDataCoursesStudentRemovedEvent) {
    this.removedBy = data.removedBy;
    this.coursesStudent = data.coursesStudent;
  }
}
