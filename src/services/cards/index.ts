import { CreateCardService } from './create-card';
import { FindAllCardsService } from './find-all-cards';
import { FindCardByIdService } from './find-card-by-id';
import { RemoveCardService } from './remove-card';
import { UpdateCardService } from './update-card';

export const CardServices = [
  CreateCardService,
  RemoveCardService,
  UpdateCardService,
  FindCardByIdService,
  FindAllCardsService
];
