import { CreateActivityResolver } from './create-activity';
import { RemoveActivityResolver } from './remove-activity';
import { UpdateActivityResolver } from './update-activity';

export const ActivitiesMutations = [
  CreateActivityResolver,
  RemoveActivityResolver,
  UpdateActivityResolver
];
