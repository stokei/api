import { ICommand } from '@nestjs/cqrs';
import {
  UpdateTagDTO,
  UpdateTagDataDTO,
  UpdateTagWhereDTO
} from '@/dtos/tags/update-tag.dto';

export class UpdateTagCommand implements ICommand, UpdateTagDTO {
  data: UpdateTagDataDTO;
  where: UpdateTagWhereDTO;
  constructor(data: UpdateTagDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
