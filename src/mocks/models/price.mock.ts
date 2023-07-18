import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { defaultCurrencyId } from '@/constants/default-currency-id';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { IPriceModelData, PriceModel } from '@/models/price.model';

export class PriceModelMock extends PriceModel {
  constructor(data?: Partial<IPriceModelData>) {
    super({
      _id: data?.id ?? nanoid(),
      parent: data?.parent ?? 'anyParent',
      app: data?.app ?? 'apps.dsaudhuashd454',
      nickname: data?.nickname ?? 'Price Name',
      amount: data?.amount ?? 100,
      stripePrice: data?.stripePrice ?? 'anyExternalPriceId',
      billingScheme: data?.billingScheme ?? BillingScheme.PER_UNIT,
      currency: data?.currency ?? defaultCurrencyId,
      inventoryType: data?.inventoryType ?? InventoryType.INFINITE,
      quantity: data?.quantity ?? 0,
      tiersMode: data?.tiersMode ?? null,
      fromAmount: data?.fromAmount ?? null,
      type: data?.type ?? PriceType.RECURRING,
      recurring: data?.recurring ?? 'recurrings.dsaudhuashd454',
      automaticRenew: data?.automaticRenew ?? true,
      active: data?.active ?? true,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null,
      createdBy: data?.createdBy ?? 'accounts.anyAccount',
      updatedBy: data?.updatedBy ?? 'accounts.anyAccount'
    });
  }
}
