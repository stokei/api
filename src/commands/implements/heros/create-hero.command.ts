import { ICommand } from '@nestjs/cqrs';

import { CreateHeroDTO } from '@/dtos/heros/create-hero.dto';

export class CreateHeroCommand implements ICommand, CreateHeroDTO {
  app: string;
  parent: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  image?: string;
  video?: string;
  createdBy: string;

  constructor(data: CreateHeroDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.title = data.title;
    this.titleHighlight = data.titleHighlight;
    this.subtitle = data.subtitle;
    this.image = data.image;
    this.video = data.video;
    this.createdBy = data.createdBy;
  }
}
