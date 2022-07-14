export interface RemoveModuleVideoWhereDTO {
  removedBy: string;
  module: string;
  video: string;
}

export interface RemoveModuleVideoDTO {
  where: RemoveModuleVideoWhereDTO;
}
