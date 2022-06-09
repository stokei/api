import { ICommand } from '@nestjs/cqrs';

import {
  RemoveRatingDTO,
  RemoveRatingWhereDTO
} from '@/dtos/ratings/remove-rating.dto';

export class RemoveRatingCommand implements ICommand, RemoveRatingDTO {
  where: RemoveRatingWhereDTO;
  constructor(data: RemoveRatingDTO) {
    this.where = data.where;
  }
}
