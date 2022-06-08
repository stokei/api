import { CreateActivityCommandHandler } from './create-activity';
import { RemoveActivityCommandHandler } from './remove-activity';
import { UpdateActivityCommandHandler } from './update-activity';

export const ActivityCommandHandlers = [
  CreateActivityCommandHandler,
  RemoveActivityCommandHandler,
  UpdateActivityCommandHandler
];
