import { ICommand } from '@nestjs/cqrs';

import {
  UpdateModuleVideoDataDTO,
  UpdateModuleVideoDTO,
  UpdateModuleVideoWhereDTO
} from '@/dtos/module-videos/update-module-video.dto';

export class UpdateModuleVideoCommand
  implements ICommand, UpdateModuleVideoDTO
{
  data: UpdateModuleVideoDataDTO;
  where: UpdateModuleVideoWhereDTO;
  constructor(data: UpdateModuleVideoDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
