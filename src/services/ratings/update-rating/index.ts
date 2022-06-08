import { UpdateRatingCommand } from '@/commands/implements/ratings/update-rating.command';
import { UpdateRatingDTO } from '@/dtos/ratings/update-rating.dto';
import { RatingModel } from '@/models/rating.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateRatingService
  implements IBaseService<UpdateRatingDTO, Promise<RatingModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateRatingDTO): Promise<RatingModel> {
    return await this.commandBus.execute(new UpdateRatingCommand(data));
  }
}
