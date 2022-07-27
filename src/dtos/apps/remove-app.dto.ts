export interface RemoveAppWhereDTO {
  removedBy: string;
  app: string;
}

export interface RemoveAppDTO {
  where: RemoveAppWhereDTO;
}
