import { CountImagesRepository } from './count-images';
import { CreateImageRepository } from './create-image';
import { ExistsImagesRepository } from './exists-images';
import { FindImageByIdRepository } from './find-image-by-id';
import { FindAllImagesRepository } from './find-all-images';
import { RemoveImageRepository } from './remove-image';
import { UpdateImageRepository } from './update-image';

export const ImagesRepositories = [
  CountImagesRepository,
  CreateImageRepository,
  ExistsImagesRepository,
  FindImageByIdRepository,
  FindAllImagesRepository,
  RemoveImageRepository,
  UpdateImageRepository
];
