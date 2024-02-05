import { CreateProductService } from './create-product';
import { FindAllProductsService } from './find-all-products';
import { FindProductAvatarService } from './find-product-avatar';
import { FindProductByIdService } from './find-product-by-id';
import { FindProductParentByParentService } from './find-product-parent-by-parent';
import { UpdateProductService } from './update-product';

export const ProductServices = [
  CreateProductService,
  FindProductByIdService,
  FindAllProductsService,
  UpdateProductService,
  FindProductParentByParentService,
  FindProductAvatarService
];
