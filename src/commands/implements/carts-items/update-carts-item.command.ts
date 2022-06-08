import { ICommand } from '@nestjs/cqrs';
import {
  UpdateCartsItemDTO,
  UpdateCartsItemDataDTO,
  UpdateCartsItemWhereDTO
} from '@/dtos/carts-items/update-carts-item.dto';

export class UpdateCartsItemCommand implements ICommand, UpdateCartsItemDTO {
  data: UpdateCartsItemDataDTO;
  where: UpdateCartsItemWhereDTO;
  constructor(data: UpdateCartsItemDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
