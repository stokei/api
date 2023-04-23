import { HeroType } from '@/enums/hero-type.enum';

export interface UpdateHeroDataDTO {
  updatedBy: string;
  type?: HeroType;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  image?: string;
  backgroundImage?: string;
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
