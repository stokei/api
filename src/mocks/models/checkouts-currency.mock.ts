import {
  CheckoutsCurrencyModel,
  ICheckoutsCurrencyModelData
} from '@/models/checkouts-currency.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class CheckoutsCurrencyModelMock extends CheckoutsCurrencyModel {
  constructor(data?: Partial<ICheckoutsCurrencyModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'CheckoutsCurrency Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
