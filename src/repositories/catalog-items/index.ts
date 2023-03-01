import { CountCatalogItemsRepository } from './count-catalog-items';
import { CreateCatalogItemRepository } from './create-catalog-item';
import { ExistsCatalogItemsRepository } from './exists-catalog-items';
import { FindAllCatalogItemsRepository } from './find-all-catalog-items';
import { FindCatalogItemByIdRepository } from './find-catalog-item-by-id';
import { RemoveCatalogItemRepository } from './remove-catalog-item';

export const CatalogItemsRepositories = [
  CountCatalogItemsRepository,
  CreateCatalogItemRepository,
  ExistsCatalogItemsRepository,
  FindCatalogItemByIdRepository,
  FindAllCatalogItemsRepository,
  RemoveCatalogItemRepository
];
