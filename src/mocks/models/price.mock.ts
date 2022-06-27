import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { InventoryType } from '@/enums/inventory-type.enum';
import { PriceType } from '@/enums/price-type.enum';
import { RecurringType } from '@/enums/recurring-type.enum';
import { IPriceModelData, PriceModel } from '@/models/price.model';

export class PriceModelMock extends PriceModel {
  constructor(data?: Partial<IPriceModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      default: data?.default ?? false,
      amount: data?.amount ?? 1000,
      fromAmount: data?.fromAmount ?? null,
      toAmount: data?.toAmount ?? 1000,
      paymentMethod: data?.paymentMethod ?? 'anyPaymentMethod',
      installments: data?.installments ?? 1,
      type: data?.type ?? PriceType.ONE_TIME,
      inventoryType: data?.inventoryType ?? InventoryType.INFINITE,
      recurringIntervalCount: data?.recurringIntervalCount ?? 1,
      recurringIntervalType: data?.recurringIntervalType ?? RecurringType.MONTH,
      quantity: data?.quantity ?? 1,
      active: data?.active ?? true,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
