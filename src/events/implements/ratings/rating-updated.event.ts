import { RatingModel } from '@/models/rating.model';

interface IDataRatingUpdatedEvent {
  readonly rating: RatingModel;
}

export class RatingUpdatedEvent {
  readonly rating: RatingModel;

  constructor(data: IDataRatingUpdatedEvent) {
    this.rating = data.rating;
  }
}
