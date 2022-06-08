import { ICommand } from '@nestjs/cqrs';
import { CreateRatingDTO } from '@/dtos/ratings/create-rating.dto';

export class CreateRatingCommand implements ICommand, CreateRatingDTO {
  name: string;
  parent: string;

  constructor(data: CreateRatingDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
