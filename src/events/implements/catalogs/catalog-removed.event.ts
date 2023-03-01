import { CatalogModel } from '@/models/catalog.model';

interface IDataCatalogRemovedEvent {
  readonly removedBy: string;
  readonly catalog: CatalogModel;
}

export class CatalogRemovedEvent {
  readonly removedBy: string;
  readonly catalog: CatalogModel;

  constructor(data: IDataCatalogRemovedEvent) {
    this.removedBy = data.removedBy;
    this.catalog = data.catalog;
  }
}
