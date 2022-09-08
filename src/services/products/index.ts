import { CreateProductService } from './create-product';
import { FindAllProductsService } from './find-all-products';
import { FindProductByIdService } from './find-product-by-id';
import { FindProductsByStripeProductIdsService } from './find-products-by-stripe-product-ids';

export const ProductServices = [
  CreateProductService,
  FindProductByIdService,
  FindAllProductsService,
  FindProductsByStripeProductIdsService
];
