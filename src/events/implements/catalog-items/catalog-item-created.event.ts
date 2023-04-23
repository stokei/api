import { CatalogItemModel } from '@/models/catalog-item.model';

interface IDataCatalogItemCreatedEvent {
  readonly createdBy: string;
  readonly catalogItem: CatalogItemModel;
}

export class CatalogItemCreatedEvent {
  readonly createdBy: string;
  readonly catalogItem: CatalogItemModel;

  constructor(data: IDataCatalogItemCreatedEvent) {
    this.createdBy = data.createdBy;
    this.catalogItem = data.catalogItem;
  }
}
