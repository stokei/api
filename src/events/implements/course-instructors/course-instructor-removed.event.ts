import { CourseInstructorModel } from '@/models/course-instructor.model';

interface IDataCourseInstructorRemovedEvent {
  readonly removedBy: string;
  readonly courseInstructor: CourseInstructorModel;
}

export class CourseInstructorRemovedEvent {
  readonly removedBy: string;
  readonly courseInstructor: CourseInstructorModel;

  constructor(data: IDataCourseInstructorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.courseInstructor = data.courseInstructor;
  }
}
