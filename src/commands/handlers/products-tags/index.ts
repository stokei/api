import { CreateProductsTagCommandHandler } from './create-products-tag';
import { RemoveProductsTagCommandHandler } from './remove-products-tag';
import { UpdateProductsTagCommandHandler } from './update-products-tag';

export const ProductsTagCommandHandlers = [
  CreateProductsTagCommandHandler,
  RemoveProductsTagCommandHandler,
  UpdateProductsTagCommandHandler
];
