import { CountAppsRepository } from './count-apps';
import { CreateAppRepository } from './create-app';
import { ExistsAppsRepository } from './exists-apps';
import { FindAllAppsRepository } from './find-all-apps';
import { FindAppByIdRepository } from './find-app-by-id';
import { FindAppBySlugRepository } from './find-app-by-slug';
import { UpdateAppRepository } from './update-app';

export const AppsRepositories = [
  CountAppsRepository,
  CreateAppRepository,
  ExistsAppsRepository,
  FindAppByIdRepository,
  FindAllAppsRepository,
  UpdateAppRepository,
  FindAppBySlugRepository
];
