import { CreateFeatureCommandHandler } from './create-feature';
import { RemoveFeatureCommandHandler } from './remove-feature';
import { UpdateFeatureCommandHandler } from './update-feature';

export const FeatureCommandHandlers = [
  CreateFeatureCommandHandler,
  RemoveFeatureCommandHandler,
  UpdateFeatureCommandHandler
];
