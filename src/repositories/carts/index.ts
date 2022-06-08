import { CountCartsRepository } from './count-carts';
import { CreateCartRepository } from './create-cart';
import { ExistsCartsRepository } from './exists-carts';
import { FindCartByIdRepository } from './find-cart-by-id';
import { FindAllCartsRepository } from './find-all-carts';
import { RemoveCartRepository } from './remove-cart';
import { UpdateCartRepository } from './update-cart';

export const CartsRepositories = [
  CountCartsRepository,
  CreateCartRepository,
  ExistsCartsRepository,
  FindCartByIdRepository,
  FindAllCartsRepository,
  RemoveCartRepository,
  UpdateCartRepository
];
