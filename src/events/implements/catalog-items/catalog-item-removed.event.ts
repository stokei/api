import { CatalogItemModel } from '@/models/catalog-item.model';

interface IDataCatalogItemRemovedEvent {
  readonly removedBy: string;
  readonly catalogItem: CatalogItemModel;
}

export class CatalogItemRemovedEvent {
  readonly removedBy: string;
  readonly catalogItem: CatalogItemModel;

  constructor(data: IDataCatalogItemRemovedEvent) {
    this.removedBy = data.removedBy;
    this.catalogItem = data.catalogItem;
  }
}
