import { Injectable, Scope } from '@nestjs/common';
import { FindAllRatingsService } from '@/services/ratings/find-all-ratings';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class RatingsLoader {
  constructor(private readonly ratingsService: FindAllRatingsService) {}

  readonly findByIds = new DataLoader(async (ratingIds: string[]) => {
    const ratings = await this.ratingsService.execute({
      where: {
        AND: {
          ids: ratingIds
        }
      }
    });
    const ratingsMap = new Map(
      ratings?.items?.map((rating) => [rating.id, rating])
    );
    return ratingIds.map((ratingId) => ratingsMap.get(ratingId));
  });
}
