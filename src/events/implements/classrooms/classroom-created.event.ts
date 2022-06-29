import { ClassroomModel } from '@/models/classroom.model';

interface IDataClassroomCreatedEvent {
  readonly createdBy: string;
  readonly classroom: ClassroomModel;
}

export class ClassroomCreatedEvent {
  readonly createdBy: string;
  readonly classroom: ClassroomModel;

  constructor(data: IDataClassroomCreatedEvent) {
    this.createdBy = data.createdBy;
    this.classroom = data.classroom;
  }
}
