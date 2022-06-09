import { ICommand } from '@nestjs/cqrs';

import {
  UpdateVideosMaterialDataDTO,
  UpdateVideosMaterialDTO,
  UpdateVideosMaterialWhereDTO
} from '@/dtos/videos-materials/update-videos-material.dto';

export class UpdateVideosMaterialCommand
  implements ICommand, UpdateVideosMaterialDTO
{
  data: UpdateVideosMaterialDataDTO;
  where: UpdateVideosMaterialWhereDTO;
  constructor(data: UpdateVideosMaterialDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
