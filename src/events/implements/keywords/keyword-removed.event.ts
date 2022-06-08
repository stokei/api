import { KeywordModel } from '@/models/keyword.model';

interface IDataKeywordRemovedEvent {
  readonly keyword: KeywordModel;
}

export class KeywordRemovedEvent {
  readonly keyword: KeywordModel;

  constructor(data: IDataKeywordRemovedEvent) {
    this.keyword = data.keyword;
  }
}
