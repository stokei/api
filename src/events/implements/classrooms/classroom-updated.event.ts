import { ClassroomModel } from '@/models/classroom.model';

interface IDataClassroomUpdatedEvent {
  readonly classroom: ClassroomModel;
}

export class ClassroomUpdatedEvent {
  readonly classroom: ClassroomModel;

  constructor(data: IDataClassroomUpdatedEvent) {
    this.classroom = data.classroom;
  }
}
