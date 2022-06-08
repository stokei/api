import { ICommand } from '@nestjs/cqrs';
import {
  UpdateCardDTO,
  UpdateCardDataDTO,
  UpdateCardWhereDTO
} from '@/dtos/cards/update-card.dto';

export class UpdateCardCommand implements ICommand, UpdateCardDTO {
  data: UpdateCardDataDTO;
  where: UpdateCardWhereDTO;
  constructor(data: UpdateCardDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
