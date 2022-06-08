import { Args, Query, Resolver } from '@nestjs/graphql';
import { CardsLoader } from '@/controllers/graphql/dataloaders/cards.loader';
import { Card } from '@/controllers/graphql/types/card';
import { CardNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Card)
export class CardResolver {
  constructor(private readonly cardsLoader: CardsLoader) {}

  @Query(() => Card)
  async card(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const card = await this.cardsLoader.findByIds.load(id);
    if (!card) {
      throw new CardNotFoundException();
    }
    return card;
  }
}
