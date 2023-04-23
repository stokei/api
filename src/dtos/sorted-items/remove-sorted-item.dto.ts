export interface RemoveSortedItemWhereDTO {
  removedBy: string;
  app: string;
  sortedItem: string;
}

export interface RemoveSortedItemDTO {
  where: RemoveSortedItemWhereDTO;
}
