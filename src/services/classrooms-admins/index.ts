import { CreateClassroomsAdminService } from './create-classrooms-admin';
import { FindAllClassroomsAdminsService } from './find-all-classrooms-admins';
import { FindClassroomsAdminByIdService } from './find-classrooms-admin-by-id';
import { RemoveClassroomsAdminService } from './remove-classrooms-admin';
import { UpdateClassroomsAdminService } from './update-classrooms-admin';

export const ClassroomsAdminServices = [
  CreateClassroomsAdminService,
  RemoveClassroomsAdminService,
  UpdateClassroomsAdminService,
  FindClassroomsAdminByIdService,
  FindAllClassroomsAdminsService
];
