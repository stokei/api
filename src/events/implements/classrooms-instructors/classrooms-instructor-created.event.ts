import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

interface IDataClassroomsInstructorCreatedEvent {
  readonly createdBy: string;
  readonly classroomsInstructor: ClassroomsInstructorModel;
}

export class ClassroomsInstructorCreatedEvent {
  readonly createdBy: string;
  readonly classroomsInstructor: ClassroomsInstructorModel;

  constructor(data: IDataClassroomsInstructorCreatedEvent) {
    this.createdBy = data.createdBy;
    this.classroomsInstructor = data.classroomsInstructor;
  }
}
