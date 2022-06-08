import { ICommand } from '@nestjs/cqrs';
import {
  RemoveVideosMaterialDTO,
  RemoveVideosMaterialWhereDTO
} from '@/dtos/videos-materials/remove-videos-material.dto';

export class RemoveVideosMaterialCommand
  implements ICommand, RemoveVideosMaterialDTO
{
  where: RemoveVideosMaterialWhereDTO;
  constructor(data: RemoveVideosMaterialDTO) {
    this.where = data.where;
  }
}
