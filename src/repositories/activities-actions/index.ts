import { CountActivitiesActionsRepository } from './count-activities-actions';
import { CreateActivitiesActionRepository } from './create-activities-action';
import { ExistsActivitiesActionsRepository } from './exists-activities-actions';
import { FindActivitiesActionByIdRepository } from './find-activities-action-by-id';
import { FindAllActivitiesActionsRepository } from './find-all-activities-actions';
import { RemoveActivitiesActionRepository } from './remove-activities-action';
import { UpdateActivitiesActionRepository } from './update-activities-action';

export const ActivitiesActionsRepositories = [
  CountActivitiesActionsRepository,
  CreateActivitiesActionRepository,
  ExistsActivitiesActionsRepository,
  FindActivitiesActionByIdRepository,
  FindAllActivitiesActionsRepository,
  RemoveActivitiesActionRepository,
  UpdateActivitiesActionRepository
];
