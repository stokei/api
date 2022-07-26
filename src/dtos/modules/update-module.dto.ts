export interface UpdateModuleDataDTO {
  updatedBy: string;
  app: string;
  name?: string;
  description?: string;
}

export interface UpdateModuleWhereDTO {
  moduleId: string;
}

export interface UpdateModuleDTO {
  data: UpdateModuleDataDTO;
  where: UpdateModuleWhereDTO;
}
