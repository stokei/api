import { LanguageModel } from '@/models/language.model';

interface IDataLanguageCreatedEvent {
  readonly language: LanguageModel;
}

export class LanguageCreatedEvent {
  readonly language: LanguageModel;

  constructor(data: IDataLanguageCreatedEvent) {
    this.language = data.language;
  }
}
