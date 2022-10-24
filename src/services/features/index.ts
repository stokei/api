import { CreateFeatureService } from './create-feature';
import { FindAllFeaturesService } from './find-all-features';
import { FindFeatureByIdService } from './find-feature-by-id';
import { RemoveFeatureService } from './remove-feature';
import { UpdateFeatureService } from './update-feature';

export const FeatureServices = [
  CreateFeatureService,
  RemoveFeatureService,
  UpdateFeatureService,
  FindFeatureByIdService,
  FindAllFeaturesService
];
