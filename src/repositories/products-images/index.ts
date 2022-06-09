import { CountProductsImagesRepository } from './count-products-images';
import { CreateProductsImageRepository } from './create-products-image';
import { ExistsProductsImagesRepository } from './exists-products-images';
import { FindAllProductsImagesRepository } from './find-all-products-images';
import { FindProductsImageByIdRepository } from './find-products-image-by-id';
import { RemoveProductsImageRepository } from './remove-products-image';
import { UpdateProductsImageRepository } from './update-products-image';

export const ProductsImagesRepositories = [
  CountProductsImagesRepository,
  CreateProductsImageRepository,
  ExistsProductsImagesRepository,
  FindProductsImageByIdRepository,
  FindAllProductsImagesRepository,
  RemoveProductsImageRepository,
  UpdateProductsImageRepository
];
