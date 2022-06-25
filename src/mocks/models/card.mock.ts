import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CardBrand } from '@/enums/card-brand.enum';
import { CardModel, ICardModelData } from '@/models/card.model';

export class CardModelMock extends CardModel {
  constructor(data?: Partial<ICardModelData>) {
    super({
      _id: nanoid(),
      parent: data?.parent ?? 'anyParent',
      externalCardId: data?.externalCardId ?? 'CardID',
      lastFourNumber: data?.lastFourNumber ?? '9999',
      brand: data?.brand ?? CardBrand.VISA,
      default: data?.default ?? false,
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
