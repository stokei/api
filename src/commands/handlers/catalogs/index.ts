import { CreateCatalogCommandHandler } from './create-catalog';
import { RemoveCatalogCommandHandler } from './remove-catalog';
import { UpdateCatalogCommandHandler } from './update-catalog';

export const CatalogCommandHandlers = [
  CreateCatalogCommandHandler,
  RemoveCatalogCommandHandler,
  UpdateCatalogCommandHandler
];
