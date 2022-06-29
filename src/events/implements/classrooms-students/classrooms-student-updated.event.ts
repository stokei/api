import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

interface IDataClassroomsStudentUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomsStudent: ClassroomsStudentModel;
}

export class ClassroomsStudentUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomsStudent: ClassroomsStudentModel;

  constructor(data: IDataClassroomsStudentUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroomsStudent = data.classroomsStudent;
  }
}
