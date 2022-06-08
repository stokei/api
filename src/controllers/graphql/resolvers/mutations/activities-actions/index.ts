import { CreateActivitiesActionResolver } from './create-activities-action';
import { RemoveActivitiesActionResolver } from './remove-activities-action';
import { UpdateActivitiesActionResolver } from './update-activities-action';

export const ActivitiesActionsMutations = [
  CreateActivitiesActionResolver,
  RemoveActivitiesActionResolver,
  UpdateActivitiesActionResolver
];
