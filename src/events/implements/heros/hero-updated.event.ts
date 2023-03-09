import { HeroModel } from '@/models/hero.model';

interface IDataHeroUpdatedEvent {
  readonly updatedBy: string;
  readonly hero: HeroModel;
}

export class HeroUpdatedEvent {
  readonly updatedBy: string;
  readonly hero: HeroModel;

  constructor(data: IDataHeroUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.hero = data.hero;
  }
}
