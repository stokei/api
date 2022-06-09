import { CreateProductsCategoryService } from './create-products-category';
import { FindAllProductsCategoriesService } from './find-all-products-categories';
import { FindProductsCategoryByIdService } from './find-products-category-by-id';
import { RemoveProductsCategoryService } from './remove-products-category';
import { UpdateProductsCategoryService } from './update-products-category';

export const ProductsCategoryServices = [
  CreateProductsCategoryService,
  RemoveProductsCategoryService,
  UpdateProductsCategoryService,
  FindProductsCategoryByIdService,
  FindAllProductsCategoriesService
];
