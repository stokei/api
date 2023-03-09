export interface UpdateHeroDataDTO {
  updatedBy: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  image?: string;
  video?: string;
}

export interface UpdateHeroWhereDTO {
  app: string;
  hero: string;
}

export interface UpdateHeroDTO {
  data: UpdateHeroDataDTO;
  where: UpdateHeroWhereDTO;
}
