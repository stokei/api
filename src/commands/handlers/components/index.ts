import { CloneComponentsTreeCommandHandler } from './clone-components-tree';
import { CreateComponentCommandHandler } from './create-component';
import { CreateComponentsTreeCommandHandler } from './create-components-tree';
import { RemoveComponentCommandHandler } from './remove-component';
import { RemoveComponentsCommandHandler } from './remove-components';
import { UpdateComponentCommandHandler } from './update-component';
import { UpdateComponentsOrderCommandHandler } from './update-components-order';

export const ComponentCommandHandlers = [
  CreateComponentCommandHandler,
  RemoveComponentCommandHandler,
  RemoveComponentsCommandHandler,
  UpdateComponentCommandHandler,
  CloneComponentsTreeCommandHandler,
  CreateComponentsTreeCommandHandler,
  UpdateComponentsOrderCommandHandler
];
