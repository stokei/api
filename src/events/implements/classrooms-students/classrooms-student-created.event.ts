import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

interface IDataClassroomsStudentCreatedEvent {
  readonly classroomsStudent: ClassroomsStudentModel;
}

export class ClassroomsStudentCreatedEvent {
  readonly classroomsStudent: ClassroomsStudentModel;

  constructor(data: IDataClassroomsStudentCreatedEvent) {
    this.classroomsStudent = data.classroomsStudent;
  }
}
