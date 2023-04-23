import { HeroModel } from '@/models/hero.model';

interface IDataHeroCreatedEvent {
  readonly createdBy: string;
  readonly hero: HeroModel;
}

export class HeroCreatedEvent {
  readonly createdBy: string;
  readonly hero: HeroModel;

  constructor(data: IDataHeroCreatedEvent) {
    this.createdBy = data.createdBy;
    this.hero = data.hero;
  }
}
