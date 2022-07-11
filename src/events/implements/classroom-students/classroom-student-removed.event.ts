import { ClassroomStudentModel } from '@/models/classroom-student.model';

interface IDataClassroomStudentRemovedEvent {
  readonly removedBy: string;
  readonly classroomStudent: ClassroomStudentModel;
}

export class ClassroomStudentRemovedEvent {
  readonly removedBy: string;
  readonly classroomStudent: ClassroomStudentModel;

  constructor(data: IDataClassroomStudentRemovedEvent) {
    this.removedBy = data.removedBy;
    this.classroomStudent = data.classroomStudent;
  }
}
