export interface CreateHeroDTO {
  app: string;
  parent: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  image?: string;
  video?: string;
  createdBy: string;
}
