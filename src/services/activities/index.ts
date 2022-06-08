import { FindActivityByIdService } from './find-activity-by-id';
import { FindAllActivitiesService } from './find-all-activities';
import { CreateActivityService } from './create-activity';
import { RemoveActivityService } from './remove-activity';
import { UpdateActivityService } from './update-activity';

export const ActivityServices = [
  CreateActivityService,
  RemoveActivityService,
  UpdateActivityService,
  FindActivityByIdService,
  FindAllActivitiesService
];
