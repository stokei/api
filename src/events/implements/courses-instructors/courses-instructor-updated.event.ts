import { CoursesInstructorModel } from '@/models/courses-instructor.model';

interface IDataCoursesInstructorUpdatedEvent {
  readonly updatedBy: string;
  readonly coursesInstructor: CoursesInstructorModel;
}

export class CoursesInstructorUpdatedEvent {
  readonly updatedBy: string;
  readonly coursesInstructor: CoursesInstructorModel;

  constructor(data: IDataCoursesInstructorUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.coursesInstructor = data.coursesInstructor;
  }
}
