import { ICommand } from '@nestjs/cqrs';

import { CreateHeroDTO } from '@/dtos/heros/create-hero.dto';
import { HeroType } from '@/enums/hero-type.enum';

export class CreateHeroCommand implements ICommand, CreateHeroDTO {
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

  constructor(data: CreateHeroDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.title = data.title;
    this.titleHighlight = data.titleHighlight;
    this.subtitle = data.subtitle;
    this.type = data.type;
    this.image = data.image;
    this.backgroundImage = data.backgroundImage;
    this.video = data.video;
    this.createdBy = data.createdBy;
  }
}
