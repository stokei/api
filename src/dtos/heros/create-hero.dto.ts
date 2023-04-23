import { HeroType } from '@/enums/hero-type.enum';

export interface CreateHeroDTO {
  app: string;
  parent: string;
  type: HeroType;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  image?: string;
  backgroundImage?: string;
  video?: string;
  createdBy: string;
}
