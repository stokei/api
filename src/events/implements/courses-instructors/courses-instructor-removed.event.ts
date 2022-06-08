import { CoursesInstructorModel } from '@/models/courses-instructor.model';

interface IDataCoursesInstructorRemovedEvent {
  readonly coursesInstructor: CoursesInstructorModel;
}

export class CoursesInstructorRemovedEvent {
  readonly coursesInstructor: CoursesInstructorModel;

  constructor(data: IDataCoursesInstructorRemovedEvent) {
    this.coursesInstructor = data.coursesInstructor;
  }
}
