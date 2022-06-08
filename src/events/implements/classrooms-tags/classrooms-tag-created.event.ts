import { ClassroomsTagModel } from '@/models/classrooms-tag.model';

interface IDataClassroomsTagCreatedEvent {
  readonly classroomsTag: ClassroomsTagModel;
}

export class ClassroomsTagCreatedEvent {
  readonly classroomsTag: ClassroomsTagModel;

  constructor(data: IDataClassroomsTagCreatedEvent) {
    this.classroomsTag = data.classroomsTag;
  }
}
