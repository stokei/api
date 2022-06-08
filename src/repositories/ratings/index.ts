import { CountRatingsRepository } from './count-ratings';
import { CreateRatingRepository } from './create-rating';
import { ExistsRatingsRepository } from './exists-ratings';
import { FindRatingByIdRepository } from './find-rating-by-id';
import { FindAllRatingsRepository } from './find-all-ratings';
import { RemoveRatingRepository } from './remove-rating';
import { UpdateRatingRepository } from './update-rating';

export const RatingsRepositories = [
  CountRatingsRepository,
  CreateRatingRepository,
  ExistsRatingsRepository,
  FindRatingByIdRepository,
  FindAllRatingsRepository,
  RemoveRatingRepository,
  UpdateRatingRepository
];
