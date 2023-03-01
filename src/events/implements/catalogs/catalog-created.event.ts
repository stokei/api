import { CatalogModel } from '@/models/catalog.model';

interface IDataCatalogCreatedEvent {
  readonly createdBy: string;
  readonly catalog: CatalogModel;
}

export class CatalogCreatedEvent {
  readonly createdBy: string;
  readonly catalog: CatalogModel;

  constructor(data: IDataCatalogCreatedEvent) {
    this.createdBy = data.createdBy;
    this.catalog = data.catalog;
  }
}
