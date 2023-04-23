import { CatalogModel } from '@/models/catalog.model';

interface IDataCatalogUpdatedEvent {
  readonly updatedBy: string;
  readonly catalog: CatalogModel;
}

export class CatalogUpdatedEvent {
  readonly updatedBy: string;
  readonly catalog: CatalogModel;

  constructor(data: IDataCatalogUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.catalog = data.catalog;
  }
}
