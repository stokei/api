import { CoursesInstructorModel } from '@/models/courses-instructor.model';

interface IDataCoursesInstructorCreatedEvent {
  readonly coursesInstructor: CoursesInstructorModel;
}

export class CoursesInstructorCreatedEvent {
  readonly coursesInstructor: CoursesInstructorModel;

  constructor(data: IDataCoursesInstructorCreatedEvent) {
    this.coursesInstructor = data.coursesInstructor;
  }
}
