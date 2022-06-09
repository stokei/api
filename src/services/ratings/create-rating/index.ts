import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateRatingCommand } from '@/commands/implements/ratings/create-rating.command';
import { CreateRatingDTO } from '@/dtos/ratings/create-rating.dto';
import { RatingModel } from '@/models/rating.model';

@Injectable()
export class CreateRatingService
  implements IBaseService<CreateRatingDTO, Promise<RatingModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateRatingDTO): Promise<RatingModel> {
    return await this.commandBus.execute(new CreateRatingCommand(data));
  }
}
