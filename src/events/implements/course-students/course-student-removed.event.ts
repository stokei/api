import { CourseStudentModel } from '@/models/course-student.model';

interface IDataCourseStudentRemovedEvent {
  readonly removedBy: string;
  readonly isLastCourseStudent: boolean;
  readonly courseStudent: CourseStudentModel;
}

export class CourseStudentRemovedEvent {
  readonly removedBy: string;
  readonly isLastCourseStudent: boolean;
  readonly courseStudent: CourseStudentModel;

  constructor(data: IDataCourseStudentRemovedEvent) {
    this.removedBy = data.removedBy;
    this.isLastCourseStudent = data.isLastCourseStudent;
    this.courseStudent = data.courseStudent;
  }
}
