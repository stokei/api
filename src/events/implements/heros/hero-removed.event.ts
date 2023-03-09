import { HeroModel } from '@/models/hero.model';

interface IDataHeroRemovedEvent {
  readonly removedBy: string;
  readonly hero: HeroModel;
}

export class HeroRemovedEvent {
  readonly removedBy: string;
  readonly hero: HeroModel;

  constructor(data: IDataHeroRemovedEvent) {
    this.removedBy = data.removedBy;
    this.hero = data.hero;
  }
}
