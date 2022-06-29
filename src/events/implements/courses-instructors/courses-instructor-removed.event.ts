import { CoursesInstructorModel } from '@/models/courses-instructor.model';

interface IDataCoursesInstructorRemovedEvent {
  readonly removedBy: string;
  readonly coursesInstructor: CoursesInstructorModel;
}

export class CoursesInstructorRemovedEvent {
  readonly removedBy: string;
  readonly coursesInstructor: CoursesInstructorModel;

  constructor(data: IDataCoursesInstructorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.coursesInstructor = data.coursesInstructor;
  }
}
