import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

interface IDataClassroomsAdminRemovedEvent {
  readonly classroomsAdmin: ClassroomsAdminModel;
}

export class ClassroomsAdminRemovedEvent {
  readonly classroomsAdmin: ClassroomsAdminModel;

  constructor(data: IDataClassroomsAdminRemovedEvent) {
    this.classroomsAdmin = data.classroomsAdmin;
  }
}
