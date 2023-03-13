export interface UpdateSortedItemDataDTO {
  index?: number;
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
