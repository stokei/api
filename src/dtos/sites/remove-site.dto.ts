export interface RemovePageWhereDTO {
  removedBy: string;
  app: string;
  page: string;
}

export interface RemovePageDTO {
  where: RemovePageWhereDTO;
}
