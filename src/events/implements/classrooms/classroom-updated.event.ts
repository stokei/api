import { ClassroomModel } from '@/models/classroom.model';

interface IDataClassroomUpdatedEvent {
  readonly updatedBy: string;
  readonly classroom: ClassroomModel;
}

export class ClassroomUpdatedEvent {
  readonly updatedBy: string;
  readonly classroom: ClassroomModel;

  constructor(data: IDataClassroomUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroom = data.classroom;
  }
}
