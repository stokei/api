import { CountClassroomsAdminsRepository } from './count-classrooms-admins';
import { CreateClassroomsAdminRepository } from './create-classrooms-admin';
import { ExistsClassroomsAdminsRepository } from './exists-classrooms-admins';
import { FindAllClassroomsAdminsRepository } from './find-all-classrooms-admins';
import { FindClassroomsAdminByIdRepository } from './find-classrooms-admin-by-id';
import { RemoveClassroomsAdminRepository } from './remove-classrooms-admin';
import { UpdateClassroomsAdminRepository } from './update-classrooms-admin';

export const ClassroomsAdminsRepositories = [
  CountClassroomsAdminsRepository,
  CreateClassroomsAdminRepository,
  ExistsClassroomsAdminsRepository,
  FindClassroomsAdminByIdRepository,
  FindAllClassroomsAdminsRepository,
  RemoveClassroomsAdminRepository,
  UpdateClassroomsAdminRepository
];
