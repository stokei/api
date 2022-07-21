export interface UpdateModuleDataDTO {
  updatedBy: string;
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
