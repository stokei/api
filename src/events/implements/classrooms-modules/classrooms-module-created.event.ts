import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

interface IDataClassroomsModuleCreatedEvent {
  readonly createdBy: string;
  readonly classroomsModule: ClassroomsModuleModel;
}

export class ClassroomsModuleCreatedEvent {
  readonly createdBy: string;
  readonly classroomsModule: ClassroomsModuleModel;

  constructor(data: IDataClassroomsModuleCreatedEvent) {
    this.createdBy = data.createdBy;
    this.classroomsModule = data.classroomsModule;
  }
}
