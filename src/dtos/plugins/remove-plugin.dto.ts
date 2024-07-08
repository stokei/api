export interface RemovePluginWhereDTO {
  removedBy: string;
  plugin: string;
}

export interface RemovePluginDTO {
  where: RemovePluginWhereDTO;
}
