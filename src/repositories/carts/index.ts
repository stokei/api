import { CountCartsRepository } from './count-carts';
import { CreateCartRepository } from './create-cart';
import { FindAllCartsRepository } from './find-all-carts';
import { FindCartByIdRepository } from './find-cart-by-id';

export const CartsRepositories = [
  CountCartsRepository,
  CreateCartRepository,
  FindCartByIdRepository,
  FindAllCartsRepository
];
