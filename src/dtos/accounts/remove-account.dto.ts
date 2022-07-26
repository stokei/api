export interface RemoveAccountWhereDTO {
  removedBy: string;
  app: string;
  accountId: string;
}

export interface RemoveAccountDTO {
  where: RemoveAccountWhereDTO;
}
