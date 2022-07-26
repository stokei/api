export interface RemoveAppWhereDTO {
  removedBy: string;
  app: string;
  appId: string;
}

export interface RemoveAppDTO {
  where: RemoveAppWhereDTO;
}
