import { KeywordModel, IKeywordModelData } from '@/models/keyword.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class KeywordModelMock extends KeywordModel {
  constructor(data?: Partial<IKeywordModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Keyword Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
