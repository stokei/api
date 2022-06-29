export interface RemoveAccountWhereDTO {
  removedBy: string;
  accountId: string;
}

export interface RemoveAccountDTO {
  where: RemoveAccountWhereDTO;
}
