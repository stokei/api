import { ICommand } from '@nestjs/cqrs';
import {
  RemoveVideoDTO,
  RemoveVideoWhereDTO
} from '@/dtos/videos/remove-video.dto';

export class RemoveVideoCommand implements ICommand, RemoveVideoDTO {
  where: RemoveVideoWhereDTO;
  constructor(data: RemoveVideoDTO) {
    this.where = data.where;
  }
}
