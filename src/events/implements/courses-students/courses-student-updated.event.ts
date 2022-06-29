import { CoursesStudentModel } from '@/models/courses-student.model';

interface IDataCoursesStudentUpdatedEvent {
  readonly updatedBy: string;
  readonly coursesStudent: CoursesStudentModel;
}

export class CoursesStudentUpdatedEvent {
  readonly updatedBy: string;
  readonly coursesStudent: CoursesStudentModel;

  constructor(data: IDataCoursesStudentUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.coursesStudent = data.coursesStudent;
  }
}
