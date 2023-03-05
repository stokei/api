export interface RemoveRoleWhereDTO {
  removedBy: string;
  app: string;
  role: string;
}

export interface RemoveRoleDTO {
  where: RemoveRoleWhereDTO;
}
