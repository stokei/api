import { convertToISODateString } from '@stokei/nestjs';
import { RatingEntity } from '@/entities';
import { RatingModel } from '@/models/rating.model';

export class RatingMapper {
  toModel(rating: RatingEntity) {
    return (
      rating &&
      new RatingModel({
        ...rating,
        updatedAt: convertToISODateString(rating.updatedAt),
        createdAt: convertToISODateString(rating.createdAt)
      })
    );
  }
  toModels(ratings: RatingEntity[]) {
    return ratings?.length > 0 ? ratings.map(this.toModel).filter(Boolean) : [];
  }
}
