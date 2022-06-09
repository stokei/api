import { FindAllRatingsQueryHandler } from './find-all-ratings';
import { FindRatingByIdQueryHandler } from './find-rating-by-id';

export const RatingQueriesHandlers = [
  FindRatingByIdQueryHandler,
  FindAllRatingsQueryHandler
];
