export interface UpdateSitesDarkColorDataDTO {
  name?: string;
}

export interface UpdateSitesDarkColorWhereDTO {
  sitesDarkColorId: string;
}

export interface UpdateSitesDarkColorDTO {
  data: UpdateSitesDarkColorDataDTO;
  where: UpdateSitesDarkColorWhereDTO;
}
