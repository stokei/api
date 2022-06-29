export interface RemoveModuleWhereDTO {
  removedBy: string;
  moduleId: string;
}

export interface RemoveModuleDTO {
  where: RemoveModuleWhereDTO;
}
