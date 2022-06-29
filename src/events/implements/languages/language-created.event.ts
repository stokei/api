import { LanguageModel } from '@/models/language.model';

interface IDataLanguageCreatedEvent {
  readonly createdBy: string;
  readonly language: LanguageModel;
}

export class LanguageCreatedEvent {
  readonly createdBy: string;
  readonly language: LanguageModel;

  constructor(data: IDataLanguageCreatedEvent) {
    this.createdBy = data.createdBy;
    this.language = data.language;
  }
}
