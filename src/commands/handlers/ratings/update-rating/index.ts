import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateRatingCommand } from '@/commands/implements/ratings/update-rating.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RatingNotFoundException
} from '@/errors';
import { FindRatingByIdRepository } from '@/repositories/ratings/find-rating-by-id';
import { UpdateRatingRepository } from '@/repositories/ratings/update-rating';

type UpdateRatingCommandKeys = keyof UpdateRatingCommand;

@CommandHandler(UpdateRatingCommand)
export class UpdateRatingCommandHandler
  implements ICommandHandler<UpdateRatingCommand>
{
  constructor(
    private readonly findRatingByIdRepository: FindRatingByIdRepository,
    private readonly updateRatingRepository: UpdateRatingRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateRatingCommand) {
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

    const updated = await this.updateRatingRepository.execute({
      ...data,
      where: {
        ...data.where,
        ratingId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const ratingUpdated = await this.findRatingByIdRepository.execute(ratingId);
    if (!ratingUpdated) {
      throw new RatingNotFoundException();
    }
    const ratingModel = this.publisher.mergeObjectContext(ratingUpdated);
    ratingModel.updatedRating();
    ratingModel.commit();

    return ratingUpdated;
  }

  private clearData(command: UpdateRatingCommand): UpdateRatingCommand {
    return cleanObject({
      where: cleanObject({
        ratingId: cleanValue(command?.where?.ratingId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
