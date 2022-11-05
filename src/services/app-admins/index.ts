import { CreateAppAdminService } from './create-app-admin';
import { FindAllAppAdminsService } from './find-all-app-admins';
import { FindAppAdminByIdService } from './find-app-admin-by-id';
import { RemoveAppAdminService } from './remove-app-admin';

export const AppAdminServices = [
  CreateAppAdminService,
  RemoveAppAdminService,
  FindAppAdminByIdService,
  FindAllAppAdminsService
];
