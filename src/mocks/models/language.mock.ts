import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { ILanguageModelData, LanguageModel } from '@/models/language.model';

export class LanguageModelMock extends LanguageModel {
  constructor(data?: Partial<ILanguageModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Language Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
