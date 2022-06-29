import { CardModel } from '@/models/card.model';

interface IDataCardCreatedEvent {
  readonly createdBy: string;
  readonly card: CardModel;
}

export class CardCreatedEvent {
  readonly createdBy: string;
  readonly card: CardModel;

  constructor(data: IDataCardCreatedEvent) {
    this.createdBy = data.createdBy;
    this.card = data.card;
  }
}
