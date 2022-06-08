import { CreateActivitiesActionCommandHandler } from './create-activities-action';
import { RemoveActivitiesActionCommandHandler } from './remove-activities-action';
import { UpdateActivitiesActionCommandHandler } from './update-activities-action';

export const ActivitiesActionCommandHandlers = [
  CreateActivitiesActionCommandHandler,
  RemoveActivitiesActionCommandHandler,
  UpdateActivitiesActionCommandHandler
];
