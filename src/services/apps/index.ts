import { CreateAppService } from './create-app';
import { FindAllAppsService } from './find-all-apps';
import { FindAppByIdService } from './find-app-by-id';
import { UpdateAppService } from './update-app';

export const AppServices = [
  CreateAppService,
  UpdateAppService,
  FindAppByIdService,
  FindAllAppsService
];
