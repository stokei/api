import { CoursesInstructorModel } from '@/models/courses-instructor.model';

interface IDataCoursesInstructorCreatedEvent {
  readonly createdBy: string;
  readonly coursesInstructor: CoursesInstructorModel;
}

export class CoursesInstructorCreatedEvent {
  readonly createdBy: string;
  readonly coursesInstructor: CoursesInstructorModel;

  constructor(data: IDataCoursesInstructorCreatedEvent) {
    this.createdBy = data.createdBy;
    this.coursesInstructor = data.coursesInstructor;
  }
}
