export interface RemoveVersionWhereDTO {
  removedBy: string;
  app: string;
  version: string;
}

export interface RemoveVersionDTO {
  where: RemoveVersionWhereDTO;
}
