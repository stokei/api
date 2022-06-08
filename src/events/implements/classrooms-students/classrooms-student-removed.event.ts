import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

interface IDataClassroomsStudentRemovedEvent {
  readonly classroomsStudent: ClassroomsStudentModel;
}

export class ClassroomsStudentRemovedEvent {
  readonly classroomsStudent: ClassroomsStudentModel;

  constructor(data: IDataClassroomsStudentRemovedEvent) {
    this.classroomsStudent = data.classroomsStudent;
  }
}
