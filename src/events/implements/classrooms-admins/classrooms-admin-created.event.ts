import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

interface IDataClassroomsAdminCreatedEvent {
  readonly classroomsAdmin: ClassroomsAdminModel;
}

export class ClassroomsAdminCreatedEvent {
  readonly classroomsAdmin: ClassroomsAdminModel;

  constructor(data: IDataClassroomsAdminCreatedEvent) {
    this.classroomsAdmin = data.classroomsAdmin;
  }
}
