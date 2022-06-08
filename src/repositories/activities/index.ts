import { CountActivitiesRepository } from './count-activities';
import { CreateActivityRepository } from './create-activity';
import { ExistsActivitiesRepository } from './exists-activities';
import { FindActivityByIdRepository } from './find-activity-by-id';
import { FindAllActivitiesRepository } from './find-all-activities';
import { RemoveActivityRepository } from './remove-activity';
import { UpdateActivityRepository } from './update-activity';

export const ActivitiesRepositories = [
  CountActivitiesRepository,
  CreateActivityRepository,
  ExistsActivitiesRepository,
  FindActivityByIdRepository,
  FindAllActivitiesRepository,
  RemoveActivityRepository,
  UpdateActivityRepository
];
