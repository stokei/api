import { CreateComponentCommandHandler } from './create-component';
import { RemoveComponentCommandHandler } from './remove-component';
import { UpdateComponentCommandHandler } from './update-component';

export const ComponentCommandHandlers = [
  CreateComponentCommandHandler,
  RemoveComponentCommandHandler,
  UpdateComponentCommandHandler
];
