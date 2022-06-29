import { CardModel } from '@/models/card.model';

interface IDataCardUpdatedEvent {
  readonly updatedBy: string;
  readonly card: CardModel;
}

export class CardUpdatedEvent {
  readonly updatedBy: string;
  readonly card: CardModel;

  constructor(data: IDataCardUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.card = data.card;
  }
}
