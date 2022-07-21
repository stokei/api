import { CreateImageService } from './create-image';
import { FindAllImagesService } from './find-all-images';
import { FindImageByIdService } from './find-image-by-id';
import { RemoveImageService } from './remove-image';

export const ImageServices = [
  CreateImageService,
  RemoveImageService,
  FindImageByIdService,
  FindAllImagesService
];
