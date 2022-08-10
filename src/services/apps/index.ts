import { CreateAppService } from './create-app';
import { FindAllAppsService } from './find-all-apps';
import { FindAppByIdService } from './find-app-by-id';
import { FindAppCurrentPlanService } from './find-app-current-plan';
import { UpdateAppService } from './update-app';

export const AppServices = [
  CreateAppService,
  UpdateAppService,
  FindAppCurrentPlanService,
  FindAppByIdService,
  FindAllAppsService
];
