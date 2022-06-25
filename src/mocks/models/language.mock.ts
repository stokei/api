import { convertToISODateString } from '@stokei/nestjs';

import { ILanguageModelData, LanguageModel } from '@/models/language.model';

export class LanguageModelMock extends LanguageModel {
  constructor(data?: Partial<ILanguageModelData>) {
    super({
      _id: 'PT-BR',
      name: data?.name ?? 'Português',
      icon: data?.icon ?? null,
      active: data?.active ?? true,
      activatedAt: data?.activatedAt ?? null,
      deactivatedAt: data?.deactivatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
