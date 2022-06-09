import { RatingCreatedHandler } from './rating-created.handler';
import { RatingRemovedHandler } from './rating-removed.handler';
import { RatingUpdatedHandler } from './rating-updated.handler';

export const RatingEventsHandlers = [
  RatingCreatedHandler,
  RatingUpdatedHandler,
  RatingRemovedHandler
];
