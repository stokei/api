import { ClassroomsTagModel } from '@/models/classrooms-tag.model';

interface IDataClassroomsTagUpdatedEvent {
  readonly classroomsTag: ClassroomsTagModel;
}

export class ClassroomsTagUpdatedEvent {
  readonly classroomsTag: ClassroomsTagModel;

  constructor(data: IDataClassroomsTagUpdatedEvent) {
    this.classroomsTag = data.classroomsTag;
  }
}
