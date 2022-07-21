import { CreateProductService } from './create-product';
import { FindAllProductsService } from './find-all-products';
import { FindProductByIdService } from './find-product-by-id';

export const ProductServices = [
  CreateProductService,
  FindProductByIdService,
  FindAllProductsService
];
