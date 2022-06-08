import { RatingModel } from '@/models/rating.model';

interface IDataRatingRemovedEvent {
  readonly rating: RatingModel;
}

export class RatingRemovedEvent {
  readonly rating: RatingModel;

  constructor(data: IDataRatingRemovedEvent) {
    this.rating = data.rating;
  }
}
