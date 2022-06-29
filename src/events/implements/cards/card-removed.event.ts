import { CardModel } from '@/models/card.model';

interface IDataCardRemovedEvent {
  readonly removedBy: string;
  readonly card: CardModel;
}

export class CardRemovedEvent {
  readonly removedBy: string;
  readonly card: CardModel;

  constructor(data: IDataCardRemovedEvent) {
    this.removedBy = data.removedBy;
    this.card = data.card;
  }
}
