import { CreateCatalogService } from './create-catalog';
import { FindAllCatalogsService } from './find-all-catalogs';
import { FindCatalogByIdService } from './find-catalog-by-id';
import { RemoveCatalogService } from './remove-catalog';
import { UpdateCatalogService } from './update-catalog';

export const CatalogServices = [
  CreateCatalogService,
  RemoveCatalogService,
  UpdateCatalogService,
  FindCatalogByIdService,
  FindAllCatalogsService
];
