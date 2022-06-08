import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

interface IDataClassroomsModuleCreatedEvent {
  readonly classroomsModule: ClassroomsModuleModel;
}

export class ClassroomsModuleCreatedEvent {
  readonly classroomsModule: ClassroomsModuleModel;

  constructor(data: IDataClassroomsModuleCreatedEvent) {
    this.classroomsModule = data.classroomsModule;
  }
}
