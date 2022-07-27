export interface RemoveModuleWhereDTO {
  removedBy: string;
  app: string;
  module: string;
}

export interface RemoveModuleDTO {
  where: RemoveModuleWhereDTO;
}
