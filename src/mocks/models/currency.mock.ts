import { convertToISODateString } from '@stokei/nestjs';

import { CurrencyModel, ICurrencyModelData } from '@/models/currency.model';

export class CurrencyModelMock extends CurrencyModel {
  constructor(data?: Partial<ICurrencyModelData>) {
    super({
      _id: 'BRL',
      name: data?.name ?? 'Real',
      symbol: data?.symbol ?? 'R$',
      minorUnit: data?.minorUnit ?? 2,
      active: data?.active ?? true,
      activatedAt: data?.activatedAt ?? null,
      deactivatedAt: data?.deactivatedAt ?? null,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
