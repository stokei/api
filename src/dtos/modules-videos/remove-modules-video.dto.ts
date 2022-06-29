export interface RemoveModulesVideoWhereDTO {
  removedBy: string;
  modulesVideoId: string;
}

export interface RemoveModulesVideoDTO {
  where: RemoveModulesVideoWhereDTO;
}
