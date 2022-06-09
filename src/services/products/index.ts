import { CreateProductService } from './create-product';
import { FindAllProductsService } from './find-all-products';
import { FindProductByIdService } from './find-product-by-id';
import { RemoveProductService } from './remove-product';
import { UpdateProductService } from './update-product';

export const ProductServices = [
  CreateProductService,
  RemoveProductService,
  UpdateProductService,
  FindProductByIdService,
  FindAllProductsService
];
