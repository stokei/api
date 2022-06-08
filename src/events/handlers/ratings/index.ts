import { RatingCreatedHandler } from './rating-created.handler';
import { RatingUpdatedHandler } from './rating-updated.handler';
import { RatingRemovedHandler } from './rating-removed.handler';

export const RatingEventsHandlers = [
  RatingCreatedHandler,
  RatingUpdatedHandler,
  RatingRemovedHandler
];
