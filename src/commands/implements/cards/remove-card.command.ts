import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCardDTO,
  RemoveCardWhereDTO
} from '@/dtos/cards/remove-card.dto';

export class RemoveCardCommand implements ICommand, RemoveCardDTO {
  where: RemoveCardWhereDTO;
  constructor(data: RemoveCardDTO) {
    this.where = data.where;
  }
}
