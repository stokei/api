import { ICommand } from '@nestjs/cqrs';
import {
  UpdateAccessDTO,
  UpdateAccessDataDTO,
  UpdateAccessWhereDTO
} from '@/dtos/accesses/update-access.dto';

export class UpdateAccessCommand implements ICommand, UpdateAccessDTO {
  data: UpdateAccessDataDTO;
  where: UpdateAccessWhereDTO;
  constructor(data: UpdateAccessDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
