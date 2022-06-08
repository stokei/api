import { CountCardsRepository } from './count-cards';
import { CreateCardRepository } from './create-card';
import { ExistsCardsRepository } from './exists-cards';
import { FindCardByIdRepository } from './find-card-by-id';
import { FindAllCardsRepository } from './find-all-cards';
import { RemoveCardRepository } from './remove-card';
import { UpdateCardRepository } from './update-card';

export const CardsRepositories = [
  CountCardsRepository,
  CreateCardRepository,
  ExistsCardsRepository,
  FindCardByIdRepository,
  FindAllCardsRepository,
  RemoveCardRepository,
  UpdateCardRepository
];
