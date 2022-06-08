import { CreateCartCommandHandler } from './create-cart';
import { RemoveCartCommandHandler } from './remove-cart';
import { UpdateCartCommandHandler } from './update-cart';

export const CartCommandHandlers = [
  CreateCartCommandHandler,
  RemoveCartCommandHandler,
  UpdateCartCommandHandler
];
