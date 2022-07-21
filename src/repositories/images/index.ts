import { CountImagesRepository } from './count-images';
import { CreateImageRepository } from './create-image';
import { FindAllImagesRepository } from './find-all-images';
import { FindImageByIdRepository } from './find-image-by-id';
import { RemoveImageRepository } from './remove-image';

export const ImagesRepositories = [
  CountImagesRepository,
  CreateImageRepository,
  FindImageByIdRepository,
  FindAllImagesRepository,
  RemoveImageRepository
];
