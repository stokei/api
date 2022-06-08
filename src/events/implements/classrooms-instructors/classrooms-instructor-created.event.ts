import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

interface IDataClassroomsInstructorCreatedEvent {
  readonly classroomsInstructor: ClassroomsInstructorModel;
}

export class ClassroomsInstructorCreatedEvent {
  readonly classroomsInstructor: ClassroomsInstructorModel;

  constructor(data: IDataClassroomsInstructorCreatedEvent) {
    this.classroomsInstructor = data.classroomsInstructor;
  }
}
