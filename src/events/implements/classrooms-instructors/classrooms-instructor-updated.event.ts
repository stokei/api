import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

interface IDataClassroomsInstructorUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomsInstructor: ClassroomsInstructorModel;
}

export class ClassroomsInstructorUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomsInstructor: ClassroomsInstructorModel;

  constructor(data: IDataClassroomsInstructorUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroomsInstructor = data.classroomsInstructor;
  }
}
