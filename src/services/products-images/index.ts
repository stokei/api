import { FindProductsImageByIdService } from './find-products-image-by-id';
import { FindAllProductsImagesService } from './find-all-products-images';
import { CreateProductsImageService } from './create-products-image';
import { RemoveProductsImageService } from './remove-products-image';
import { UpdateProductsImageService } from './update-products-image';

export const ProductsImageServices = [
  CreateProductsImageService,
  RemoveProductsImageService,
  UpdateProductsImageService,
  FindProductsImageByIdService,
  FindAllProductsImagesService
];
