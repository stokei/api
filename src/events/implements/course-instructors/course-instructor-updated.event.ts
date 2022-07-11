import { CourseInstructorModel } from '@/models/course-instructor.model';

interface IDataCourseInstructorUpdatedEvent {
  readonly updatedBy: string;
  readonly courseInstructor: CourseInstructorModel;
}

export class CourseInstructorUpdatedEvent {
  readonly updatedBy: string;
  readonly courseInstructor: CourseInstructorModel;

  constructor(data: IDataCourseInstructorUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.courseInstructor = data.courseInstructor;
  }
}
