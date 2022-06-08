import { CreateProductsImageCommandHandler } from './create-products-image';
import { RemoveProductsImageCommandHandler } from './remove-products-image';
import { UpdateProductsImageCommandHandler } from './update-products-image';

export const ProductsImageCommandHandlers = [
  CreateProductsImageCommandHandler,
  RemoveProductsImageCommandHandler,
  UpdateProductsImageCommandHandler
];
