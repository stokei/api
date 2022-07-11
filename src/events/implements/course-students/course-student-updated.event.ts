import { CourseStudentModel } from '@/models/course-student.model';

interface IDataCourseStudentUpdatedEvent {
  readonly updatedBy: string;
  readonly courseStudent: CourseStudentModel;
}

export class CourseStudentUpdatedEvent {
  readonly updatedBy: string;
  readonly courseStudent: CourseStudentModel;

  constructor(data: IDataCourseStudentUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.courseStudent = data.courseStudent;
  }
}
