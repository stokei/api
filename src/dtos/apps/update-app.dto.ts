export interface UpdateAppDataDTO {
  name?: string;
  description?: string;
  avatar?: string;
  plan?: string;
  favicon?: string;
  logo?: string;
  updatedBy: string;
  app: string;
}

export interface UpdateAppWhereDTO {
  appId: string;
}

export interface UpdateAppDTO {
  data: UpdateAppDataDTO;
  where: UpdateAppWhereDTO;
}
