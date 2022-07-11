import { CourseInstructorModel } from '@/models/course-instructor.model';

interface IDataCourseInstructorCreatedEvent {
  readonly createdBy: string;
  readonly courseInstructor: CourseInstructorModel;
}

export class CourseInstructorCreatedEvent {
  readonly createdBy: string;
  readonly courseInstructor: CourseInstructorModel;

  constructor(data: IDataCourseInstructorCreatedEvent) {
    this.createdBy = data.createdBy;
    this.courseInstructor = data.courseInstructor;
  }
}
