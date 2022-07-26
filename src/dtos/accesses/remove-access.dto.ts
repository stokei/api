export interface RemoveAccessWhereDTO {
  removedBy: string;
  app: string;
  accessId: string;
  accountId: string;
}

export interface RemoveAccessDTO {
  where: RemoveAccessWhereDTO;
}
