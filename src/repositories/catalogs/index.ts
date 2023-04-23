import { CountCatalogsRepository } from './count-catalogs';
import { CreateCatalogRepository } from './create-catalog';
import { FindAllCatalogsRepository } from './find-all-catalogs';
import { FindCatalogByIdRepository } from './find-catalog-by-id';
import { RemoveCatalogRepository } from './remove-catalog';
import { UpdateCatalogRepository } from './update-catalog';

export const CatalogsRepositories = [
  CountCatalogsRepository,
  CreateCatalogRepository,
  FindCatalogByIdRepository,
  FindAllCatalogsRepository,
  RemoveCatalogRepository,
  UpdateCatalogRepository
];
