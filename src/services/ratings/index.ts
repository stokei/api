import { FindRatingByIdService } from './find-rating-by-id';
import { FindAllRatingsService } from './find-all-ratings';
import { CreateRatingService } from './create-rating';
import { RemoveRatingService } from './remove-rating';
import { UpdateRatingService } from './update-rating';

export const RatingServices = [
  CreateRatingService,
  RemoveRatingService,
  UpdateRatingService,
  FindRatingByIdService,
  FindAllRatingsService
];
