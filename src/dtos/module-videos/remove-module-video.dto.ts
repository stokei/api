export interface RemoveModuleVideoWhereDTO {
  removedBy: string;
  moduleVideoId: string;
}

export interface RemoveModuleVideoDTO {
  where: RemoveModuleVideoWhereDTO;
}
