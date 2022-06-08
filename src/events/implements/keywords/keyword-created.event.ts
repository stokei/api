import { KeywordModel } from '@/models/keyword.model';

interface IDataKeywordCreatedEvent {
  readonly keyword: KeywordModel;
}

export class KeywordCreatedEvent {
  readonly keyword: KeywordModel;

  constructor(data: IDataKeywordCreatedEvent) {
    this.keyword = data.keyword;
  }
}
