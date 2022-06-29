export interface RemoveCardWhereDTO {
  removedBy: string;
  cardId: string;
}

export interface RemoveCardDTO {
  where: RemoveCardWhereDTO;
}
