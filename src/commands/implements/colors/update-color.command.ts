import { ICommand } from '@nestjs/cqrs';
import {
  UpdateColorDTO,
  UpdateColorDataDTO,
  UpdateColorWhereDTO
} from '@/dtos/colors/update-color.dto';

export class UpdateColorCommand implements ICommand, UpdateColorDTO {
  data: UpdateColorDataDTO;
  where: UpdateColorWhereDTO;
  constructor(data: UpdateColorDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
