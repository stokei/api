import { CoursesInstructorModel } from '@/models/courses-instructor.model';

interface IDataCoursesInstructorUpdatedEvent {
  readonly coursesInstructor: CoursesInstructorModel;
}

export class CoursesInstructorUpdatedEvent {
  readonly coursesInstructor: CoursesInstructorModel;

  constructor(data: IDataCoursesInstructorUpdatedEvent) {
    this.coursesInstructor = data.coursesInstructor;
  }
}
