import { CreateProductsTagService } from './create-products-tag';
import { FindAllProductsTagsService } from './find-all-products-tags';
import { FindProductsTagByIdService } from './find-products-tag-by-id';
import { RemoveProductsTagService } from './remove-products-tag';
import { UpdateProductsTagService } from './update-products-tag';

export const ProductsTagServices = [
  CreateProductsTagService,
  RemoveProductsTagService,
  UpdateProductsTagService,
  FindProductsTagByIdService,
  FindAllProductsTagsService
];
