import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

interface IDataClassroomsModuleRemovedEvent {
  readonly removedBy: string;
  readonly classroomsModule: ClassroomsModuleModel;
}

export class ClassroomsModuleRemovedEvent {
  readonly removedBy: string;
  readonly classroomsModule: ClassroomsModuleModel;

  constructor(data: IDataClassroomsModuleRemovedEvent) {
    this.removedBy = data.removedBy;
    this.classroomsModule = data.classroomsModule;
  }
}
