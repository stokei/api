import { CreateProductService } from './create-product';
import { FindAllProductsService } from './find-all-products';
import { FindProductAvatarService } from './find-product-avatar';
import { FindProductByIdService } from './find-product-by-id';
import { FindProductExternalReferenceByExternalReferenceService } from './find-product-external-reference-by-external-reference';
import { FindProductsBestSellerByPeriodService } from './find-products-best-seller-by-period';
import { UpdateProductService } from './update-product';

export const ProductServices = [
  CreateProductService,
  FindProductByIdService,
  FindAllProductsService,
  UpdateProductService,
  FindProductExternalReferenceByExternalReferenceService,
  FindProductAvatarService,
  FindProductsBestSellerByPeriodService
];
