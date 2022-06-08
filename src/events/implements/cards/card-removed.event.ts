import { CardModel } from '@/models/card.model';

interface IDataCardRemovedEvent {
  readonly card: CardModel;
}

export class CardRemovedEvent {
  readonly card: CardModel;

  constructor(data: IDataCardRemovedEvent) {
    this.card = data.card;
  }
}
