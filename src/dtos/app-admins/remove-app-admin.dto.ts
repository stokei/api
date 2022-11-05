export interface RemoveAppAdminWhereDTO {
  removedBy: string;
  app: string;
  admin: string;
}

export interface RemoveAppAdminDTO {
  where: RemoveAppAdminWhereDTO;
}
