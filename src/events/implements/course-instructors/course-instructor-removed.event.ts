import { CourseInstructorModel } from '@/models/course-instructor.model';

interface IDataCourseInstructorRemovedEvent {
  readonly removedBy: string;
  readonly isLastCourseInstructor: boolean;
  readonly courseInstructor: CourseInstructorModel;
}

export class CourseInstructorRemovedEvent {
  readonly removedBy: string;
  readonly isLastCourseInstructor: boolean;
  readonly courseInstructor: CourseInstructorModel;

  constructor(data: IDataCourseInstructorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.isLastCourseInstructor = data.isLastCourseInstructor;
    this.courseInstructor = data.courseInstructor;
  }
}
