import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

interface IDataClassroomsStudentCreatedEvent {
  readonly createdBy: string;
  readonly classroomsStudent: ClassroomsStudentModel;
}

export class ClassroomsStudentCreatedEvent {
  readonly createdBy: string;
  readonly classroomsStudent: ClassroomsStudentModel;

  constructor(data: IDataClassroomsStudentCreatedEvent) {
    this.createdBy = data.createdBy;
    this.classroomsStudent = data.classroomsStudent;
  }
}
