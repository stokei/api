import { ICommand } from '@nestjs/cqrs';

import {
  RemoveModuleVideoDTO,
  RemoveModuleVideoWhereDTO
} from '@/dtos/module-videos/remove-module-video.dto';

export class RemoveModuleVideoCommand
  implements ICommand, RemoveModuleVideoDTO
{
  where: RemoveModuleVideoWhereDTO;
  constructor(data: RemoveModuleVideoDTO) {
    this.where = data.where;
  }
}
