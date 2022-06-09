import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveRatingCommand } from '@/commands/implements/ratings/remove-rating.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RatingNotFoundException
} from '@/errors';
import { FindRatingByIdRepository } from '@/repositories/ratings/find-rating-by-id';
import { RemoveRatingRepository } from '@/repositories/ratings/remove-rating';

type RemoveRatingCommandKeys = keyof RemoveRatingCommand;

@CommandHandler(RemoveRatingCommand)
export class RemoveRatingCommandHandler
  implements ICommandHandler<RemoveRatingCommand>
{
  constructor(
    private readonly findRatingByIdRepository: FindRatingByIdRepository,
    private readonly removeRatingRepository: RemoveRatingRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveRatingCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const ratingId = splitServiceId(data.where?.ratingId)?.id;
    if (!ratingId) {
      throw new ParamNotFoundException('ratingId');
    }

    const rating = await this.findRatingByIdRepository.execute(ratingId);
    if (!rating) {
      throw new RatingNotFoundException();
    }

    const removed = await this.removeRatingRepository.execute({
      where: {
        ratingId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const ratingModel = this.publisher.mergeObjectContext(rating);
    ratingModel.removedRating();
    ratingModel.commit();

    return rating;
  }

  private clearData(command: RemoveRatingCommand): RemoveRatingCommand {
    return cleanObject({
      where: cleanObject({
        ratingId: cleanValue(command?.where?.ratingId)
      })
    });
  }
}
