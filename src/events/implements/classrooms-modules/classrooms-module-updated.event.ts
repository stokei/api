import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

interface IDataClassroomsModuleUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomsModule: ClassroomsModuleModel;
}

export class ClassroomsModuleUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomsModule: ClassroomsModuleModel;

  constructor(data: IDataClassroomsModuleUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroomsModule = data.classroomsModule;
  }
}
