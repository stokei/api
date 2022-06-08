import { CardModel } from '@/models/card.model';

interface IDataCardCreatedEvent {
  readonly card: CardModel;
}

export class CardCreatedEvent {
  readonly card: CardModel;

  constructor(data: IDataCardCreatedEvent) {
    this.card = data.card;
  }
}
