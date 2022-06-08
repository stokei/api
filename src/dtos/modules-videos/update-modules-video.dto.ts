export interface UpdateModulesVideoDataDTO {
  name?: string;
}

export interface UpdateModulesVideoWhereDTO {
  modulesVideoId: string;
}

export interface UpdateModulesVideoDTO {
  data: UpdateModulesVideoDataDTO;
  where: UpdateModulesVideoWhereDTO;
}
