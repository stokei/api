export interface UpdateModuleVideoDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateModuleVideoWhereDTO {
  moduleVideoId: string;
}

export interface UpdateModuleVideoDTO {
  data: UpdateModuleVideoDataDTO;
  where: UpdateModuleVideoWhereDTO;
}
