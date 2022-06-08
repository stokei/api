import { CreateProductCommandHandler } from './create-product';
import { RemoveProductCommandHandler } from './remove-product';
import { UpdateProductCommandHandler } from './update-product';

export const ProductCommandHandlers = [
  CreateProductCommandHandler,
  RemoveProductCommandHandler,
  UpdateProductCommandHandler
];
