import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

interface IDataClassroomsInstructorRemovedEvent {
  readonly removedBy: string;
  readonly classroomsInstructor: ClassroomsInstructorModel;
}

export class ClassroomsInstructorRemovedEvent {
  readonly removedBy: string;
  readonly classroomsInstructor: ClassroomsInstructorModel;

  constructor(data: IDataClassroomsInstructorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.classroomsInstructor = data.classroomsInstructor;
  }
}
