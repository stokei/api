import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

interface IDataClassroomsStudentRemovedEvent {
  readonly removedBy: string;
  readonly classroomsStudent: ClassroomsStudentModel;
}

export class ClassroomsStudentRemovedEvent {
  readonly removedBy: string;
  readonly classroomsStudent: ClassroomsStudentModel;

  constructor(data: IDataClassroomsStudentRemovedEvent) {
    this.removedBy = data.removedBy;
    this.classroomsStudent = data.classroomsStudent;
  }
}
