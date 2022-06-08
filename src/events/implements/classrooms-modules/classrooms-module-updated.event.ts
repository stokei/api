import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

interface IDataClassroomsModuleUpdatedEvent {
  readonly classroomsModule: ClassroomsModuleModel;
}

export class ClassroomsModuleUpdatedEvent {
  readonly classroomsModule: ClassroomsModuleModel;

  constructor(data: IDataClassroomsModuleUpdatedEvent) {
    this.classroomsModule = data.classroomsModule;
  }
}
