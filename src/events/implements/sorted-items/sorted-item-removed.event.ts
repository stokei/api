import { SortedItemModel } from '@/models/sorted-item.model';

interface IDataSortedItemRemovedEvent {
  readonly removedBy: string;
  readonly sortedItem: SortedItemModel;
}

export class SortedItemRemovedEvent {
  readonly removedBy: string;
  readonly sortedItem: SortedItemModel;

  constructor(data: IDataSortedItemRemovedEvent) {
    this.removedBy = data.removedBy;
    this.sortedItem = data.sortedItem;
  }
}
