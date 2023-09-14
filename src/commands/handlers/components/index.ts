import { CloneComponentsTreeCommandHandler } from './clone-components-tree';
import { CreateComponentCommandHandler } from './create-component';
import { CreateMultipleComponentsCommandHandler } from './create-multiple-components';
import { RemoveComponentCommandHandler } from './remove-component';
import { UpdateComponentCommandHandler } from './update-component';

export const ComponentCommandHandlers = [
  CreateComponentCommandHandler,
  RemoveComponentCommandHandler,
  UpdateComponentCommandHandler,
  CreateMultipleComponentsCommandHandler,
  CloneComponentsTreeCommandHandler
];
