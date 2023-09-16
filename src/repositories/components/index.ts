import { CountComponentsRepository } from './count-components';
import { CreateComponentRepository } from './create-component';
import { FindAllComponentsRepository } from './find-all-components';
import { FindAllComponentsByParentIdsRepository } from './find-all-components-by-parent-ids';
import { FindAllComponentsWithComponentsChildrenRepository } from './find-all-components-with-components-children';
import { FindComponentByIdRepository } from './find-component-by-id';
import { RemoveComponentRepository } from './remove-component';
import { RemoveComponentsRepository } from './remove-components';
import { UpdateComponentRepository } from './update-component';

export const ComponentsRepositories = [
  CountComponentsRepository,
  CreateComponentRepository,
  FindComponentByIdRepository,
  FindAllComponentsRepository,
  RemoveComponentRepository,
  UpdateComponentRepository,
  FindAllComponentsByParentIdsRepository,
  FindAllComponentsWithComponentsChildrenRepository,
  RemoveComponentsRepository
];
