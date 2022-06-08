import { CreateRatingResolver } from './create-rating';
import { RemoveRatingResolver } from './remove-rating';
import { UpdateRatingResolver } from './update-rating';

export const RatingsMutations = [
  CreateRatingResolver,
  RemoveRatingResolver,
  UpdateRatingResolver
];
