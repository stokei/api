export interface RemoveAccountWhereDTO {
  removedBy: string;
  app: string;
  account: string;
}

export interface RemoveAccountDTO {
  where: RemoveAccountWhereDTO;
}
