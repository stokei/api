import { ClassroomStudentModel } from '@/models/classroom-student.model';

interface IDataClassroomStudentCreatedEvent {
  readonly createdBy: string;
  readonly classroomStudent: ClassroomStudentModel;
}

export class ClassroomStudentCreatedEvent {
  readonly createdBy: string;
  readonly classroomStudent: ClassroomStudentModel;

  constructor(data: IDataClassroomStudentCreatedEvent) {
    this.createdBy = data.createdBy;
    this.classroomStudent = data.classroomStudent;
  }
}
