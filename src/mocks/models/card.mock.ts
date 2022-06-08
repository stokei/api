import { CardModel, ICardModelData } from '@/models/card.model';
import { convertToISODateString } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

export class CardModelMock extends CardModel {
  constructor(data?: Partial<ICardModelData>) {
    super({
      _id: nanoid(),
      name: data?.name ?? 'Card Name',
      parent: data?.parent ?? 'anyParent',
      createdAt: data?.createdAt ?? convertToISODateString(Date.now()),
      updatedAt: data?.updatedAt ?? null
    });
  }
}
