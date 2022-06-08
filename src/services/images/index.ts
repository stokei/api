import { FindImageByIdService } from './find-image-by-id';
import { FindAllImagesService } from './find-all-images';
import { CreateImageService } from './create-image';
import { RemoveImageService } from './remove-image';
import { UpdateImageService } from './update-image';

export const ImageServices = [
  CreateImageService,
  RemoveImageService,
  UpdateImageService,
  FindImageByIdService,
  FindAllImagesService
];
