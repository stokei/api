import { CreateClassroomsAdminResolver } from './create-classrooms-admin';
import { RemoveClassroomsAdminResolver } from './remove-classrooms-admin';
import { UpdateClassroomsAdminResolver } from './update-classrooms-admin';

export const ClassroomsAdminsMutations = [
  CreateClassroomsAdminResolver,
  RemoveClassroomsAdminResolver,
  UpdateClassroomsAdminResolver
];
