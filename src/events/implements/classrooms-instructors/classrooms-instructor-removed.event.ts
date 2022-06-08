import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

interface IDataClassroomsInstructorRemovedEvent {
  readonly classroomsInstructor: ClassroomsInstructorModel;
}

export class ClassroomsInstructorRemovedEvent {
  readonly classroomsInstructor: ClassroomsInstructorModel;

  constructor(data: IDataClassroomsInstructorRemovedEvent) {
    this.classroomsInstructor = data.classroomsInstructor;
  }
}
