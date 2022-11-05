import { CountAppAdminsRepository } from './count-app-admins';
import { CreateAppAdminRepository } from './create-app-admin';
import { ExistsAppAdminsRepository } from './exists-app-admins';
import { FindAllAppAdminsRepository } from './find-all-app-admins';
import { FindAppAdminByIdRepository } from './find-app-admin-by-id';
import { RemoveAppAdminRepository } from './remove-app-admin';

export const AppAdminsRepositories = [
  CountAppAdminsRepository,
  CreateAppAdminRepository,
  ExistsAppAdminsRepository,
  FindAppAdminByIdRepository,
  FindAllAppAdminsRepository,
  RemoveAppAdminRepository
];
