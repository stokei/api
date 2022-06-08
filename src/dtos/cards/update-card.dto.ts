export interface UpdateCardDataDTO {
  name?: string;
}

export interface UpdateCardWhereDTO {
  cardId: string;
}

export interface UpdateCardDTO {
  data: UpdateCardDataDTO;
  where: UpdateCardWhereDTO;
}
