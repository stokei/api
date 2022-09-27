import { ClassroomModel } from '@/models/classroom.model';

interface IDataClassroomActivatedEvent {
  readonly updatedBy: string;
  readonly classroom: ClassroomModel;
}

export class ClassroomActivatedEvent {
  readonly updatedBy: string;
  readonly classroom: ClassroomModel;

  constructor(data: IDataClassroomActivatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroom = data.classroom;
  }
}
