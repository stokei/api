export interface UpdateCardDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateCardWhereDTO {
  cardId: string;
}

export interface UpdateCardDTO {
  data: UpdateCardDataDTO;
  where: UpdateCardWhereDTO;
}
