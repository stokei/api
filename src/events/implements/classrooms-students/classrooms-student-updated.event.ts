import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

interface IDataClassroomsStudentUpdatedEvent {
  readonly classroomsStudent: ClassroomsStudentModel;
}

export class ClassroomsStudentUpdatedEvent {
  readonly classroomsStudent: ClassroomsStudentModel;

  constructor(data: IDataClassroomsStudentUpdatedEvent) {
    this.classroomsStudent = data.classroomsStudent;
  }
}
