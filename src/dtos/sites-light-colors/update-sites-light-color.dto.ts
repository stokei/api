export interface UpdateSitesLightColorDataDTO {
  name?: string;
}

export interface UpdateSitesLightColorWhereDTO {
  sitesLightColorId: string;
}

export interface UpdateSitesLightColorDTO {
  data: UpdateSitesLightColorDataDTO;
  where: UpdateSitesLightColorWhereDTO;
}
