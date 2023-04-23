export interface RemoveRoleWhereDTO {
  removedBy: string;
  app: string;
  role?: string;
  parent?: string;
  name?: string;
}

export interface RemoveRoleDTO {
  where: RemoveRoleWhereDTO;
}
