import { CreateClassroomsModuleCommandHandler } from './create-classrooms-module';
import { RemoveClassroomsModuleCommandHandler } from './remove-classrooms-module';
import { UpdateClassroomsModuleCommandHandler } from './update-classrooms-module';

export const ClassroomsModuleCommandHandlers = [
  CreateClassroomsModuleCommandHandler,
  RemoveClassroomsModuleCommandHandler,
  UpdateClassroomsModuleCommandHandler
];
