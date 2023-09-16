import { CloneComponentsTreeCommandHandler } from './clone-components-tree';
import { CreateComponentCommandHandler } from './create-component';
import { RemoveComponentCommandHandler } from './remove-component';
import { RemoveComponentsCommandHandler } from './remove-components';
import { UpdateComponentCommandHandler } from './update-component';

export const ComponentCommandHandlers = [
  CreateComponentCommandHandler,
  RemoveComponentCommandHandler,
  RemoveComponentsCommandHandler,
  UpdateComponentCommandHandler,
  CloneComponentsTreeCommandHandler
];
