import { LanguageModel } from '@/models/language.model';

interface IDataLanguageRemovedEvent {
  readonly language: LanguageModel;
}

export class LanguageRemovedEvent {
  readonly language: LanguageModel;

  constructor(data: IDataLanguageRemovedEvent) {
    this.language = data.language;
  }
}
