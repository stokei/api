export interface UpdateModulesMaterialDataDTO {
  name?: string;
}

export interface UpdateModulesMaterialWhereDTO {
  modulesMaterialId: string;
}

export interface UpdateModulesMaterialDTO {
  data: UpdateModulesMaterialDataDTO;
  where: UpdateModulesMaterialWhereDTO;
}
