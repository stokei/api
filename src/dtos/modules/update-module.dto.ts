export interface UpdateModuleDataDTO {
  name?: string;
}

export interface UpdateModuleWhereDTO {
  moduleId: string;
}

export interface UpdateModuleDTO {
  data: UpdateModuleDataDTO;
  where: UpdateModuleWhereDTO;
}
