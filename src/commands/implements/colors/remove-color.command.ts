import { ICommand } from '@nestjs/cqrs';
import {
  RemoveColorDTO,
  RemoveColorWhereDTO
} from '@/dtos/colors/remove-color.dto';

export class RemoveColorCommand implements ICommand, RemoveColorDTO {
  where: RemoveColorWhereDTO;
  constructor(data: RemoveColorDTO) {
    this.where = data.where;
  }
}
