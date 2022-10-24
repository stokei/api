import { CountFeaturesRepository } from './count-features';
import { CreateFeatureRepository } from './create-feature';
import { FindAllFeaturesRepository } from './find-all-features';
import { FindFeatureByIdRepository } from './find-feature-by-id';
import { RemoveFeatureRepository } from './remove-feature';
import { UpdateFeatureRepository } from './update-feature';

export const FeaturesRepositories = [
  CountFeaturesRepository,
  CreateFeatureRepository,
  FindFeatureByIdRepository,
  FindAllFeaturesRepository,
  RemoveFeatureRepository,
  UpdateFeatureRepository
];
