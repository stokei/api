import { ClassroomModuleModel } from '@/models/classroom-module .model';

interface IDataClassroomModuleUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomModule: ClassroomModuleModel;
}

export class ClassroomModuleUpdatedEvent {
  readonly updatedBy: string;
  readonly classroomModule: ClassroomModuleModel;

  constructor(data: IDataClassroomModuleUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.classroomModule = data.classroomModule;
  }
}
