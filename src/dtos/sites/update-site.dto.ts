export interface UpdateSiteDataDTO {
  name?: string;
  slug?: string;
  favicon?: string;
  logo?: string;
  homePage?: string;
  loginPage?: string;
  signUpPage?: string;
  updatedBy: string;
}

export interface UpdateSiteWhereDTO {
  app: string;
  site: string;
}

export interface UpdateSiteDTO {
  data: UpdateSiteDataDTO;
  where: UpdateSiteWhereDTO;
}
