import { ClassroomModel } from '@/models/classroom.model';

interface IDataClassroomRemovedEvent {
  readonly classroom: ClassroomModel;
}

export class ClassroomRemovedEvent {
  readonly classroom: ClassroomModel;

  constructor(data: IDataClassroomRemovedEvent) {
    this.classroom = data.classroom;
  }
}
