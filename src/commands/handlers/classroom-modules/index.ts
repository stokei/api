import { CreateClassroomModuleCommandHandler } from './create-classroom-module';
import { RemoveClassroomModuleCommandHandler } from './remove-classroom-module';
import { UpdateClassroomModuleCommandHandler } from './update-classroom-module';

export const ClassroomModuleCommandHandlers = [
  CreateClassroomModuleCommandHandler,
  RemoveClassroomModuleCommandHandler,
  UpdateClassroomModuleCommandHandler
];
