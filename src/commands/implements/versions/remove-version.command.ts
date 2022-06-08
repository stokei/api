import { ICommand } from '@nestjs/cqrs';
import {
  RemoveVersionDTO,
  RemoveVersionWhereDTO
} from '@/dtos/versions/remove-version.dto';

export class RemoveVersionCommand implements ICommand, RemoveVersionDTO {
  where: RemoveVersionWhereDTO;
  constructor(data: RemoveVersionDTO) {
    this.where = data.where;
  }
}
