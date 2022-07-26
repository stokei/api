export interface RemoveModuleWhereDTO {
  removedBy: string;
  app: string;
  moduleId: string;
}

export interface RemoveModuleDTO {
  where: RemoveModuleWhereDTO;
}
