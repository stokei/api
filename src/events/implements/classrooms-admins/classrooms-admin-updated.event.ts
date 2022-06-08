import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

interface IDataClassroomsAdminUpdatedEvent {
  readonly classroomsAdmin: ClassroomsAdminModel;
}

export class ClassroomsAdminUpdatedEvent {
  readonly classroomsAdmin: ClassroomsAdminModel;

  constructor(data: IDataClassroomsAdminUpdatedEvent) {
    this.classroomsAdmin = data.classroomsAdmin;
  }
}
