import { CloneComponentsTreeService } from './clone-components-tree';
import { CreateComponentService } from './create-component';
import { CreateComponentsTreeService } from './create-components-tree';
import { CreateOrUpdateComponentService } from './create-or-update-component';
import { FindAllComponentsService } from './find-all-components';
import { FindAllComponentsByParentIdsService } from './find-all-components-by-parent-ids';
import { FindAllComponentsTreeService } from './find-all-components-tree';
import { FindAllComponentsWithComponentsChildrenService } from './find-all-components-with-components-children';
import { FindComponentByIdService } from './find-component-by-id';
import { RemoveComponentService } from './remove-component';
import { RemoveComponentsService } from './remove-components';
import { UpdateComponentService } from './update-component';
import { UpdateComponentsOrderService } from './update-components-order';

export const ComponentServices = [
  CreateComponentService,
  RemoveComponentService,
  RemoveComponentsService,
  UpdateComponentService,
  FindComponentByIdService,
  FindAllComponentsService,
  FindAllComponentsByParentIdsService,
  FindAllComponentsWithComponentsChildrenService,
  FindAllComponentsTreeService,
  CloneComponentsTreeService,
  CreateOrUpdateComponentService,
  CreateComponentsTreeService,
  UpdateComponentsOrderService
];
