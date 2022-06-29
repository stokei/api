export interface RemoveProjectWhereDTO {
  removedBy: string;
  projectId: string;
}

export interface RemoveProjectDTO {
  where: RemoveProjectWhereDTO;
}
