export interface RemoveAccessWhereDTO {
  removedBy: string;
  app: string;
  access: string;
  account: string;
}

export interface RemoveAccessDTO {
  where: RemoveAccessWhereDTO;
}
