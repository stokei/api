import { ClassroomModuleModel } from '@/models/classroom-module.model';

interface IDataClassroomModuleCreatedEvent {
  readonly createdBy: string;
  readonly classroomModule: ClassroomModuleModel;
}

export class ClassroomModuleCreatedEvent {
  readonly createdBy: string;
  readonly classroomModule: ClassroomModuleModel;

  constructor(data: IDataClassroomModuleCreatedEvent) {
    this.createdBy = data.createdBy;
    this.classroomModule = data.classroomModule;
  }
}
