import { SortedItemModel } from '@/models/sorted-item.model';

interface IDataSortedItemUpdatedEvent {
  readonly updatedBy: string;
  readonly sortedItem: SortedItemModel;
}

export class SortedItemUpdatedEvent {
  readonly updatedBy: string;
  readonly sortedItem: SortedItemModel;

  constructor(data: IDataSortedItemUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.sortedItem = data.sortedItem;
  }
}
