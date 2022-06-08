import { CountCartsItemsRepository } from './count-carts-items';
import { CreateCartsItemRepository } from './create-carts-item';
import { ExistsCartsItemsRepository } from './exists-carts-items';
import { FindCartsItemByIdRepository } from './find-carts-item-by-id';
import { FindAllCartsItemsRepository } from './find-all-carts-items';
import { RemoveCartsItemRepository } from './remove-carts-item';
import { UpdateCartsItemRepository } from './update-carts-item';

export const CartsItemsRepositories = [
  CountCartsItemsRepository,
  CreateCartsItemRepository,
  ExistsCartsItemsRepository,
  FindCartsItemByIdRepository,
  FindAllCartsItemsRepository,
  RemoveCartsItemRepository,
  UpdateCartsItemRepository
];
