import { CreateClassroomsAdminCommandHandler } from './create-classrooms-admin';
import { RemoveClassroomsAdminCommandHandler } from './remove-classrooms-admin';
import { UpdateClassroomsAdminCommandHandler } from './update-classrooms-admin';

export const ClassroomsAdminCommandHandlers = [
  CreateClassroomsAdminCommandHandler,
  RemoveClassroomsAdminCommandHandler,
  UpdateClassroomsAdminCommandHandler
];
