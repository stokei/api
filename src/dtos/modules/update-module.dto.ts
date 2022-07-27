export interface UpdateModuleDataDTO {
  updatedBy: string;
  name?: string;
  description?: string;
}

export interface UpdateModuleWhereDTO {
  app: string;
  module: string;
}

export interface UpdateModuleDTO {
  data: UpdateModuleDataDTO;
  where: UpdateModuleWhereDTO;
}
