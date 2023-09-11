import { CountComponentsRepository } from './count-components';
import { CreateComponentRepository } from './create-component';
import { FindAllComponentsRepository } from './find-all-components';
import { FindComponentByIdRepository } from './find-component-by-id';
import { RemoveComponentRepository } from './remove-component';
import { UpdateComponentRepository } from './update-component';

export const ComponentsRepositories = [
  CountComponentsRepository,
  CreateComponentRepository,
  FindComponentByIdRepository,
  FindAllComponentsRepository,
  RemoveComponentRepository,
  UpdateComponentRepository
];
