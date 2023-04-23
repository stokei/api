export interface UpdateSortedItemDataDTO {
  item?: string;
  updatedBy: string;
}

export interface UpdateSortedItemWhereDTO {
  app: string;
  sortedItem: string;
}

export interface UpdateSortedItemDTO {
  data: UpdateSortedItemDataDTO;
  where: UpdateSortedItemWhereDTO;
}
