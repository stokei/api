import { CreateProductsCategoryCommandHandler } from './create-products-category';
import { RemoveProductsCategoryCommandHandler } from './remove-products-category';
import { UpdateProductsCategoryCommandHandler } from './update-products-category';

export const ProductsCategoryCommandHandlers = [
  CreateProductsCategoryCommandHandler,
  RemoveProductsCategoryCommandHandler,
  UpdateProductsCategoryCommandHandler
];
