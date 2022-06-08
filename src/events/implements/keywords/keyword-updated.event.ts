import { KeywordModel } from '@/models/keyword.model';

interface IDataKeywordUpdatedEvent {
  readonly keyword: KeywordModel;
}

export class KeywordUpdatedEvent {
  readonly keyword: KeywordModel;

  constructor(data: IDataKeywordUpdatedEvent) {
    this.keyword = data.keyword;
  }
}
