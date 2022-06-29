import { ClassroomModel } from '@/models/classroom.model';

interface IDataClassroomRemovedEvent {
  readonly removedBy: string;
  readonly classroom: ClassroomModel;
}

export class ClassroomRemovedEvent {
  readonly removedBy: string;
  readonly classroom: ClassroomModel;

  constructor(data: IDataClassroomRemovedEvent) {
    this.removedBy = data.removedBy;
    this.classroom = data.classroom;
  }
}
