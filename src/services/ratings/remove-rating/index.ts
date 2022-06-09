import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveRatingCommand } from '@/commands/implements/ratings/remove-rating.command';
import { RemoveRatingDTO } from '@/dtos/ratings/remove-rating.dto';
import { RatingModel } from '@/models/rating.model';

@Injectable()
export class RemoveRatingService
  implements IBaseService<RemoveRatingDTO, Promise<RatingModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveRatingDTO): Promise<RatingModel> {
    return await this.commandBus.execute(new RemoveRatingCommand(data));
  }
}
