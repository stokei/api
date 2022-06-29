import { LanguageModel } from '@/models/language.model';

interface IDataLanguageUpdatedEvent {
  readonly updatedBy: string;
  readonly language: LanguageModel;
}

export class LanguageUpdatedEvent {
  readonly updatedBy: string;
  readonly language: LanguageModel;

  constructor(data: IDataLanguageUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.language = data.language;
  }
}
