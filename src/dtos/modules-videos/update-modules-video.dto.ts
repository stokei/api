export interface UpdateModulesVideoDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateModulesVideoWhereDTO {
  modulesVideoId: string;
}

export interface UpdateModulesVideoDTO {
  data: UpdateModulesVideoDataDTO;
  where: UpdateModulesVideoWhereDTO;
}
