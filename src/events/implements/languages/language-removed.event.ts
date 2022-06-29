import { LanguageModel } from '@/models/language.model';

interface IDataLanguageRemovedEvent {
  readonly removedBy: string;
  readonly language: LanguageModel;
}

export class LanguageRemovedEvent {
  readonly removedBy: string;
  readonly language: LanguageModel;

  constructor(data: IDataLanguageRemovedEvent) {
    this.removedBy = data.removedBy;
    this.language = data.language;
  }
}
