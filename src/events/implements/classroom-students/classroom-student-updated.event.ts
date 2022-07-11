import { ClassroomStudentModel } from '@/models/classroom-student.model';

interface IDataClassroomStudentUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomStudent: ClassroomStudentModel;
}

export class ClassroomStudentUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomStudent: ClassroomStudentModel;

  constructor(data: IDataClassroomStudentUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroomStudent = data.classroomStudent;
  }
}
