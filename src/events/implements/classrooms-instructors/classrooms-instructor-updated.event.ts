import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

interface IDataClassroomsInstructorUpdatedEvent {
  readonly classroomsInstructor: ClassroomsInstructorModel;
}

export class ClassroomsInstructorUpdatedEvent {
  readonly classroomsInstructor: ClassroomsInstructorModel;

  constructor(data: IDataClassroomsInstructorUpdatedEvent) {
    this.classroomsInstructor = data.classroomsInstructor;
  }
}
