import { CoursesStudentModel } from '@/models/courses-student.model';

interface IDataCoursesStudentCreatedEvent {
  readonly createdBy: string;
  readonly coursesStudent: CoursesStudentModel;
}

export class CoursesStudentCreatedEvent {
  readonly createdBy: string;
  readonly coursesStudent: CoursesStudentModel;

  constructor(data: IDataCoursesStudentCreatedEvent) {
    this.createdBy = data.createdBy;
    this.coursesStudent = data.coursesStudent;
  }
}
