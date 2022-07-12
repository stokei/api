import { CountCartItemsRepository } from './count-cart-items';
import { CreateCartItemRepository } from './create-cart-item';
import { ExistsCartItemsRepository } from './exists-cart-items';
import { FindAllCartItemsRepository } from './find-all-cart-items';
import { FindCartItemByIdRepository } from './find-cart-item-by-id';
import { RemoveCartItemRepository } from './remove-cart-item';

export const CartItemsRepositories = [
  CountCartItemsRepository,
  CreateCartItemRepository,
  ExistsCartItemsRepository,
  FindCartItemByIdRepository,
  FindAllCartItemsRepository,
  RemoveCartItemRepository
];
