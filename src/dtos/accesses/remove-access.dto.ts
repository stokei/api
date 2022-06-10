export interface RemoveAccessWhereDTO {
  accessId: string;
  accountId: string;
}

export interface RemoveAccessDTO {
  where: RemoveAccessWhereDTO;
}
