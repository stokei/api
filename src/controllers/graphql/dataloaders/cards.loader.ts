import { Injectable, Scope } from '@nestjs/common';
import { FindAllCardsService } from '@/services/cards/find-all-cards';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class CardsLoader {
  constructor(private readonly cardsService: FindAllCardsService) {}

  readonly findByIds = new DataLoader(async (cardIds: string[]) => {
    const cards = await this.cardsService.execute({
      where: {
        AND: {
          ids: cardIds
        }
      }
    });
    const cardsMap = new Map(cards?.items?.map((card) => [card.id, card]));
    return cardIds.map((cardId) => cardsMap.get(cardId));
  });
}
