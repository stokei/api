export interface RemoveFileWhereDTO {
  removedBy: string;
  app: string;
  file: string;
}

export interface RemoveFileDTO {
  where: RemoveFileWhereDTO;
}
