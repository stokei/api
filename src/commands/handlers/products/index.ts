import { CreateProductCommandHandler } from './create-product';
import { UpdateProductCommandHandler } from './update-product';

export const ProductCommandHandlers = [
  CreateProductCommandHandler,
  UpdateProductCommandHandler
];
