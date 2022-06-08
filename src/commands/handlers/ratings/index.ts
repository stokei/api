import { CreateRatingCommandHandler } from './create-rating';
import { RemoveRatingCommandHandler } from './remove-rating';
import { UpdateRatingCommandHandler } from './update-rating';

export const RatingCommandHandlers = [
  CreateRatingCommandHandler,
  RemoveRatingCommandHandler,
  UpdateRatingCommandHandler
];
