export interface UpdatePluginDataDTO {
  publicKey?: string;
  privateKey?: string;
  updatedBy: string;
}

export interface UpdatePluginWhereDTO {
  plugin: string;
}

export interface UpdatePluginDTO {
  data: UpdatePluginDataDTO;
  where: UpdatePluginWhereDTO;
}
