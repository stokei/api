import { CountProductsTagsRepository } from './count-products-tags';
import { CreateProductsTagRepository } from './create-products-tag';
import { ExistsProductsTagsRepository } from './exists-products-tags';
import { FindProductsTagByIdRepository } from './find-products-tag-by-id';
import { FindAllProductsTagsRepository } from './find-all-products-tags';
import { RemoveProductsTagRepository } from './remove-products-tag';
import { UpdateProductsTagRepository } from './update-products-tag';

export const ProductsTagsRepositories = [
  CountProductsTagsRepository,
  CreateProductsTagRepository,
  ExistsProductsTagsRepository,
  FindProductsTagByIdRepository,
  FindAllProductsTagsRepository,
  RemoveProductsTagRepository,
  UpdateProductsTagRepository
];
