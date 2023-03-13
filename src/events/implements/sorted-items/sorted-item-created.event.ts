import { SortedItemModel } from '@/models/sorted-item.model';

interface IDataSortedItemCreatedEvent {
  readonly createdBy: string;
  readonly sortedItem: SortedItemModel;
}

export class SortedItemCreatedEvent {
  readonly createdBy: string;
  readonly sortedItem: SortedItemModel;

  constructor(data: IDataSortedItemCreatedEvent) {
    this.createdBy = data.createdBy;
    this.sortedItem = data.sortedItem;
  }
}
