import { CreateCatalogItemService } from './create-catalog-item';
import { FindAllCatalogItemsService } from './find-all-catalog-items';
import { FindAllCatalogItemsByCatalogIdsService } from './find-all-catalog-items-by-catalog-ids';
import { FindCatalogItemByIdService } from './find-catalog-item-by-id';
import { RemoveCatalogItemService } from './remove-catalog-item';

export const CatalogItemServices = [
  CreateCatalogItemService,
  RemoveCatalogItemService,
  FindCatalogItemByIdService,
  FindAllCatalogItemsService,
  FindAllCatalogItemsByCatalogIdsService
];
