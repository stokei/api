import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

interface IDataClassroomsModuleRemovedEvent {
  readonly classroomsModule: ClassroomsModuleModel;
}

export class ClassroomsModuleRemovedEvent {
  readonly classroomsModule: ClassroomsModuleModel;

  constructor(data: IDataClassroomsModuleRemovedEvent) {
    this.classroomsModule = data.classroomsModule;
  }
}
