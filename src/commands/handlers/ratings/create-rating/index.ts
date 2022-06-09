import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateRatingCommand } from '@/commands/implements/ratings/create-rating.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RatingNotFoundException
} from '@/errors';
import { CreateRatingRepository } from '@/repositories/ratings/create-rating';

type CreateRatingCommandKeys = keyof CreateRatingCommand;

@CommandHandler(CreateRatingCommand)
export class CreateRatingCommandHandler
  implements ICommandHandler<CreateRatingCommand>
{
  constructor(
    private readonly createRatingRepository: CreateRatingRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateRatingCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateRatingCommandKeys>('parent');
    }

    const ratingCreated = await this.createRatingRepository.execute(data);
    if (!ratingCreated) {
      throw new RatingNotFoundException();
    }
    const ratingModel = this.publisher.mergeObjectContext(ratingCreated);
    ratingModel.createdRating();
    ratingModel.commit();

    return ratingCreated;
  }

  private clearData(command: CreateRatingCommand): CreateRatingCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
