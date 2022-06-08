import { LanguageModel } from '@/models/language.model';

interface IDataLanguageUpdatedEvent {
  readonly language: LanguageModel;
}

export class LanguageUpdatedEvent {
  readonly language: LanguageModel;

  constructor(data: IDataLanguageUpdatedEvent) {
    this.language = data.language;
  }
}
