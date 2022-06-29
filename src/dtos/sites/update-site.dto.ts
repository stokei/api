export interface UpdateSiteDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateSiteWhereDTO {
  siteId: string;
}

export interface UpdateSiteDTO {
  data: UpdateSiteDataDTO;
  where: UpdateSiteWhereDTO;
}
