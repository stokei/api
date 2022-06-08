import { CreateCartsItemCommandHandler } from './create-carts-item';
import { RemoveCartsItemCommandHandler } from './remove-carts-item';
import { UpdateCartsItemCommandHandler } from './update-carts-item';

export const CartsItemCommandHandlers = [
  CreateCartsItemCommandHandler,
  RemoveCartsItemCommandHandler,
  UpdateCartsItemCommandHandler
];
