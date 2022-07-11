import { ClassroomModuleModel } from '@/models/classroom-module .model';

interface IDataClassroomModuleRemovedEvent {
  readonly removedBy: string;
  readonly classroomModule: ClassroomModuleModel;
}

export class ClassroomModuleRemovedEvent {
  readonly removedBy: string;
  readonly classroomModule: ClassroomModuleModel;

  constructor(data: IDataClassroomModuleRemovedEvent) {
    this.removedBy = data.removedBy;
    this.classroomModule = data.classroomModule;
  }
}
