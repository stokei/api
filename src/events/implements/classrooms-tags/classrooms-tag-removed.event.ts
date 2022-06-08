import { ClassroomsTagModel } from '@/models/classrooms-tag.model';

interface IDataClassroomsTagRemovedEvent {
  readonly classroomsTag: ClassroomsTagModel;
}

export class ClassroomsTagRemovedEvent {
  readonly classroomsTag: ClassroomsTagModel;

  constructor(data: IDataClassroomsTagRemovedEvent) {
    this.classroomsTag = data.classroomsTag;
  }
}
