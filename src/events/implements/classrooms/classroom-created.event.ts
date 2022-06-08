import { ClassroomModel } from '@/models/classroom.model';

interface IDataClassroomCreatedEvent {
  readonly classroom: ClassroomModel;
}

export class ClassroomCreatedEvent {
  readonly classroom: ClassroomModel;

  constructor(data: IDataClassroomCreatedEvent) {
    this.classroom = data.classroom;
  }
}
