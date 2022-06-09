import { ICommand } from '@nestjs/cqrs';

import {
  UpdateRatingDataDTO,
  UpdateRatingDTO,
  UpdateRatingWhereDTO
} from '@/dtos/ratings/update-rating.dto';

export class UpdateRatingCommand implements ICommand, UpdateRatingDTO {
  data: UpdateRatingDataDTO;
  where: UpdateRatingWhereDTO;
  constructor(data: UpdateRatingDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
