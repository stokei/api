import { ClassroomModel } from '@/models/classroom.model';

interface IDataClassroomDeactivatedEvent {
  readonly updatedBy: string;
  readonly classroom: ClassroomModel;
}

export class ClassroomDeactivatedEvent {
  readonly updatedBy: string;
  readonly classroom: ClassroomModel;

  constructor(data: IDataClassroomDeactivatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroom = data.classroom;
  }
}
