import { RatingModel } from '@/models/rating.model';

interface IDataRatingCreatedEvent {
  readonly rating: RatingModel;
}

export class RatingCreatedEvent {
  readonly rating: RatingModel;

  constructor(data: IDataRatingCreatedEvent) {
    this.rating = data.rating;
  }
}
