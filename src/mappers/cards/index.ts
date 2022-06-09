import { convertToISODateString } from '@stokei/nestjs';

import { CardEntity } from '@/entities';
import { CardModel } from '@/models/card.model';

export class CardMapper {
  toModel(card: CardEntity) {
    return (
      card &&
      new CardModel({
        ...card,
        updatedAt: convertToISODateString(card.updatedAt),
        createdAt: convertToISODateString(card.createdAt)
      })
    );
  }
  toModels(cards: CardEntity[]) {
    return cards?.length > 0 ? cards.map(this.toModel).filter(Boolean) : [];
  }
}
