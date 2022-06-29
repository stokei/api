export interface RemoveAccessWhereDTO {
  removedBy: string;
  accessId: string;
  accountId: string;
}

export interface RemoveAccessDTO {
  where: RemoveAccessWhereDTO;
}
