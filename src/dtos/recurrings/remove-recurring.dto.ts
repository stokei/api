export interface RemoveRecurringWhereDTO {
  removedBy: string;
  app: string;
  recurring: string;
}

export interface RemoveRecurringDTO {
  where: RemoveRecurringWhereDTO;
}
