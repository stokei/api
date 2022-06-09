import { CreateActivitiesActionService } from './create-activities-action';
import { FindActivitiesActionByIdService } from './find-activities-action-by-id';
import { FindAllActivitiesActionsService } from './find-all-activities-actions';
import { RemoveActivitiesActionService } from './remove-activities-action';
import { UpdateActivitiesActionService } from './update-activities-action';

export const ActivitiesActionServices = [
  CreateActivitiesActionService,
  RemoveActivitiesActionService,
  UpdateActivitiesActionService,
  FindActivitiesActionByIdService,
  FindAllActivitiesActionsService
];
