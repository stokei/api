import { CardModel } from '@/models/card.model';

interface IDataCardUpdatedEvent {
  readonly card: CardModel;
}

export class CardUpdatedEvent {
  readonly card: CardModel;

  constructor(data: IDataCardUpdatedEvent) {
    this.card = data.card;
  }
}
