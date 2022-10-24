import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { defaultCurrencyId } from '@/constants/default-currency-id';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { IntervalType } from '@/enums/interval-type.enum';
import { IPriceModelData, PriceModel } from '@/models/price.model';

export class PriceModelMock extends PriceModel {
  constructor(data?: Partial<IPriceModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      default: data?.default ?? false,
      amount: data?.amount ?? 1000,
      fromAmount: data?.fromAmount ?? null,
      type: data?.type ?? PriceType.ONE_TIME,
      currency: data?.currency ?? defaultCurrencyId,
      inventoryType: data?.inventoryType ?? InventoryType.INFINITE,
      recurringIntervalCount: data?.recurringIntervalCount ?? 1,
      recurringIntervalType: data?.recurringIntervalType ?? IntervalType.MONTH,
      quantity: data?.quantity ?? 1,
      active: data?.active ?? true,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      app: data?.app ?? 'apps.anyApp',
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
